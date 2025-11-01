import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Hotel, Users } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { z } from "zod";

const roomTypes = [
  { id: "deluxe", name: "Deluxe Room", price: 1999 },
  { id: "executive", name: "Executive Suite", price: 3499 },
  { id: "presidential", name: "Presidential Suite", price: 5999 }
];

const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone must be at least 10 digits").max(20, "Phone must be less than 20 characters"),
  roomType: z.string().min(1, "Please select a room type"),
  numberOfGuests: z.number().min(1, "At least 1 guest required").max(10, "Maximum 10 guests allowed"),
  specialRequests: z.string().max(500, "Special requests must be less than 500 characters").optional()
});

const BookingPage = () => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    roomType: "",
    numberOfGuests: 1,
    specialRequests: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut || !formData.roomType) return 0;
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const room = roomTypes.find(r => r.id === formData.roomType);
    return nights * (room?.price || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate dates
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    
    if (checkIn >= checkOut) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    // Validate form data
    try {
      bookingSchema.parse({
        ...formData,
        numberOfGuests: parseInt(formData.numberOfGuests)
      });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach(err => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        toast.error("Please fix the form errors");
        return;
      }
    }

    setIsSubmitting(true);

    // Prepare booking data for Spring Boot API
    const bookingData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      roomType: formData.roomType,
      checkInDate: format(checkIn, "yyyy-MM-dd"),
      checkOutDate: format(checkOut, "yyyy-MM-dd"),
      numberOfGuests: parseInt(formData.numberOfGuests),
      specialRequests: formData.specialRequests?.trim() || "",
      totalPrice: calculateTotalPrice(),
      bookingDate: new Date().toISOString()
    };

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/api';
      const API_ENDPOINT = `${API_BASE_URL}/bookings`;
      
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      toast.success("Booking submitted successfully! We'll contact you shortly.");
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        roomType: "",
        numberOfGuests: 1,
        specialRequests: ""
      });
      setCheckIn(null);
      setCheckOut(null);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to submit booking. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = calculateTotalPrice();
  const nights = checkIn && checkOut ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <main className="flex-1 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <Hotel className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Book Your Stay</h1>
          <p className="text-muted-foreground">Reserve your perfect room with us</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Guest Booking Form</CardTitle>
            <CardDescription>Fill in your details to complete your reservation</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Booking Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Check-in Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Check-out Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          disabled={(date) => date < (checkIn || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="roomType">Room Type *</Label>
                    <Select value={formData.roomType} onValueChange={(value) => handleInputChange("roomType", value)}>
                      <SelectTrigger className={errors.roomType ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        {roomTypes.map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.name} - ₹{room.price}/night
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.roomType && <p className="text-sm text-destructive">{errors.roomType}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfGuests">Number of Guests *</Label>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="numberOfGuests"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.numberOfGuests}
                        onChange={(e) => handleInputChange("numberOfGuests", e.target.value)}
                        className={errors.numberOfGuests ? "border-destructive" : ""}
                      />
                    </div>
                    {errors.numberOfGuests && <p className="text-sm text-destructive">{errors.numberOfGuests}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Any special requirements or preferences..."
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                    className={`min-h-[100px] ₹{errors.specialRequests ? "border-destructive" : ""}`}
                  />
                  {errors.specialRequests && <p className="text-sm text-destructive">{errors.specialRequests}</p>}
                </div>
              </div>

              {/* Price Summary */}
              {totalPrice > 0 && (
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <h3 className="text-lg font-semibold">Price Summary</h3>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{nights} night(s)</span>
                    <span>₹{roomTypes.find(r => r.id === formData.roomType)?.price || 0} per night</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Complete Booking"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default BookingPage;