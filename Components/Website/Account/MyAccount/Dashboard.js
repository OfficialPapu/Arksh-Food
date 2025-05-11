"use client"
import { format } from "date-fns"
import { useState } from "react"
import { User, Upload, Lock, Eye, EyeOff, Calendar, Globe, Building, Star, Mail, Phone, Loader2 } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/Components/ui/dialog"
import { Card, CardContent } from "@/Components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import axios from "@/lib/axios"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"

const Dashboard = ({ userDetails, fetchData }) => {
    const UserID = useSelector((state) => state.Login?.UserDetails?.UserID);
    const [editProfile, setEditProfile] = useState(false)
    const [editedUser, setEditedUser] = useState({
        Gender: "",
        DOB: "",
        Country: "",
        City: "",
    })
    const [passwordModalOpen, setPasswordModalOpen] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [isLoading, setIsLoading] = useState(
        {
            Profile: false,
            Password: false,
        }
    )

    // Password change state
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleProfileChange = (field, value) => {
        setEditedUser((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const saveProfile = async () => {
        setIsLoading((prv) => ({
            ...prv,
            Profile: true,
        }));
        const formdata = new FormData();
        formdata.append("Gender", editedUser.Gender);
        formdata.append("DOB", editedUser.DOB);
        formdata.append("Country", editedUser.Country);
        formdata.append("City", editedUser.City);
        if (imageFile) formdata.append("ProfilePic", imageFile.file);
        formdata.append("UserID", UserID);
        formdata.append("isChagePassword", "false");
        try {
            const response = await axios.put(`api/account/update/profile`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                toast.success("Profile updated successfully");
                fetchData();
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
        setIsLoading((prv) => ({
            ...prv,
            Profile: false,
        }));
        setEditProfile(false)
    }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFile({
                    id: Date.now(),
                    src: reader.result,
                    file: file,
                    name: file.name,
                    size: file.size,
                });
            };
            reader.readAsDataURL(file);
        }
    }

    const handlePasswordChange = async () => {
        if (!currentPassword) {
            toast.error("Current password is required")
            return
        }

        if (!newPassword) {
            toast.error("New password is required")
            return
        }

        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters")
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        setIsLoading(prev => ({
            ...prev,
            Password: true,
        }));

        try {
            const formdata = new FormData();
            formdata.append("UserID", UserID);
            formdata.append("CurrentPassword", currentPassword);
            formdata.append("Password", newPassword);
            formdata.append("isChagePassword", "true");
            const response = await axios.put(`api/account/update/profile`, formdata);

            if (response.status === 200) {
                toast.success("Password changed successfully")
                setPasswordModalOpen(false)
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
        setIsLoading(prev => ({
            ...prev,
            Password: false,
        }));
    }

    return (
        <div className="min-h-screen">
            <main className="container mx-auto px-4 pb-6 md:pb-10">
                <Card className="border-none shadow-lg overflow-hidden bg-gray-100">
                    <div className="bg-gradient-to-r from-[#0055a4] to-[#36b7e5] p-6 md:p-8 relative rounded-xl">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="relative">
                                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                                    <AvatarImage src={imageFile?.src || process.env.NEXT_PUBLIC_IMAGE_URL + userDetails?.ProfilePic} alt={userDetails?.Name} className={"object-cover"} />
                                    <AvatarFallback className="bg-[#0055a4] text-white text-xl">
                                        {userDetails?.Name
                                            ? userDetails.Name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                            : ""}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="text-center md:text-left text-white">
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <h2 className="text-2xl font-bold">{userDetails?.Name || "User"}</h2>
                                    <Star className="h-5 w-5 text-white fill-white" />
                                </div>
                                <p className="text-white/80 mt-1 flex items-center justify-center md:justify-start gap-1">
                                    <Mail className="h-4 w-4" />
                                    {userDetails?.Email || "user@example.com"}
                                </p>
                                <p className="text-white/80 mt-1 flex items-center justify-center md:justify-start gap-1">
                                    <Phone className="h-4 w-4" />
                                    {userDetails?.Mobile || "Not provided"}
                                </p>
                                <p className="text-white/80 mt-1 text-sm flex items-center justify-center md:justify-start gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Member since:{" "}
                                    {userDetails?.CreatedAt ? format(new Date(userDetails.CreatedAt), "MMM d, yyyy") : "Not available"}
                                </p>
                            </div>
                            <div className="flex gap-3 md:ml-auto">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                                    onClick={() => setEditProfile(true)}
                                >
                                    <User className="h-3.5 w-3.5 mr-1" />
                                    Edit Profile
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                                    onClick={() => setPasswordModalOpen(true)}
                                >
                                    <Lock className="h-3.5 w-3.5 mr-1" />
                                    Password
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <CardContent className="p-0 bg-white">
                        <Tabs defaultValue="personal" className="w-full">
                            <div className="border-b border-gray-200">
                                <div>
                                    <TabsList className="h-12 bg-transparent border-b-0 p-0 w-full justify-start gap-8">
                                        <TabsTrigger
                                            value="personal"
                                            className="!shadow-none rounded-none border-b-2 border-transparent px-4 py-3 font-medium transition-all duration-200 data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
                                        >
                                            Personal Information
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="location"
                                            className="!shadow-none rounded-none border-b-2 border-transparent px-4 py-3 font-medium transition-all duration-200 data-[state=active]:border-b-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-blue-600"
                                        >
                                            Location Information
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                            </div>

                            <TabsContent value="personal" className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm font-medium text-gray-500">Full Name</p>
                                            <p className="mt-1 font-medium text-[#0055a4]">{userDetails?.Name || "Not provided"}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm font-medium text-gray-500">Email Address</p>
                                            <p className="mt-1 font-medium text-[#0055a4]">{userDetails?.Email || "Not provided"}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm font-medium text-gray-500">Phone Number</p>
                                            <p className="mt-1 font-medium text-[#0055a4]">{userDetails?.Mobile || "Not provided"}</p>
                                        </div>
                                    </div>
                                    <div className="bg-[#f8faff] p-6 rounded-lg border border-[#e6f0f9]">
                                        <h3 className="text-lg font-semibold mb-4 text-[#0055a4] flex items-center">
                                            <Star className="h-5 w-5 mr-2 text-[#36b7e5]" />
                                            Account Summary
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Account Status</span>
                                                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                                    Active
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Profile Completion</span>
                                                <span className="text-sm font-medium text-[#0055a4]">75%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-[#36b7e5] h-2 rounded-full w-3/4"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="location" className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm font-medium text-gray-500">Gender</p>
                                            <p className="mt-1 font-medium text-[#0055a4]">{editedUser.Gender || userDetails?.Gender || "Not provided"}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                                            <p className="mt-1 font-medium text-[#0055a4]">{editedUser.DOB || userDetails?.DOB ? format(new Date(userDetails.DOB), "MMM d, yyyy") : "Not provided"}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm font-medium text-gray-500">Country</p>
                                            <p className="mt-1 font-medium text-[#0055a4]">{editedUser.Country || userDetails?.Country || "Not provided"}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm font-medium text-gray-500">City</p>
                                            <p className="mt-1 font-medium text-[#0055a4]">{editedUser.City || userDetails?.City || "Not provided"}</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </main>

            {/* Password Change Modal */}
            <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center text-xl text-[#0055a4]">
                            <Lock className="h-5 w-5 mr-2 text-[#36b7e5]" />
                            Change Password
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-5 py-4">
                        <div>
                            <Label htmlFor="currentPassword" className="text-sm font-medium">
                                Current Password
                            </Label>
                            <div className="relative mt-1.5">
                                <Input
                                    id="currentPassword"
                                    type={showCurrentPassword ? "text" : "password"}
                                    placeholder="Enter current password"
                                    className="pr-10 focus:border-[#36b7e5] focus:ring-[#36b7e5]"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="newPassword" className="text-sm font-medium">
                                New Password
                            </Label>
                            <div className="relative mt-1.5">
                                <Input
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    className="pr-10 focus:border-[#36b7e5] focus:ring-[#36b7e5]"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                Confirm New Password
                            </Label>
                            <div className="relative mt-1.5">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    className="pr-10 focus:border-[#36b7e5] focus:ring-[#36b7e5]"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setPasswordModalOpen(false)} className="border-gray-200">
                            Cancel
                        </Button>
                        <Button className="bg-[#0055a4] hover:bg-[#004080] text-white" onClick={handlePasswordChange} disabled={isLoading.Password}>
                            {isLoading.Password ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 size={18} className="animate-spin" /> Changing...
                                </span>
                            ) : (
                                <>
                                    <span className="relative z-10">Change Password</span>
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Profile Modal */}
            <Dialog open={editProfile} onOpenChange={setEditProfile}>
                <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center text-xl text-[#0055a4]">
                            <User className="h-5 w-5 mr-2 text-[#36b7e5]" />
                            Edit Profile
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-5 py-4">
                        <div className="flex justify-center">
                            <div className="relative">
                                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                                    <AvatarImage src={imageFile?.src || process.env.NEXT_PUBLIC_IMAGE_URL + userDetails?.ProfilePic} alt={userDetails?.Name} className={"object-cover"} />
                                    <AvatarFallback className="bg-[#0055a4] text-white text-xl">
                                        {userDetails?.Name
                                            ? userDetails.Name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                            : ""}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute bottom-0 right-0">
                                    <label
                                        htmlFor="avatar-upload-modal"
                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-[#36b7e5] text-white cursor-pointer shadow-md hover:bg-[#0055a4] transition-colors"
                                    >
                                        <Upload className="h-4 w-4" />
                                    </label>
                                    <input
                                        id="avatar-upload-modal"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            <div>
                                <Label htmlFor="Gender" className="text-sm font-medium">
                                    <span className="flex items-center">
                                        <User className="h-4 w-4 mr-2 text-[#36b7e5]" />
                                        Gender
                                    </span>
                                </Label>
                                <select
                                    id="Gender"
                                    value={editedUser.Gender || ""}
                                    onChange={(e) => handleProfileChange("Gender", e.target.value)}
                                    className="w-full mt-1.5 border-gray-200 rounded-md focus:border-[#36b7e5] focus:ring-[#36b7e5] h-10 px-3"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="DOB" className="text-sm font-medium">
                                    <span className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2 text-[#36b7e5]" />
                                        Date of Birth
                                    </span>
                                </Label>
                                <Input
                                    id="DOB"
                                    type="date"
                                    value={editedUser.DOB || ""}
                                    onChange={(e) => handleProfileChange("DOB", e.target.value)}
                                    className="mt-1.5 focus:border-[#36b7e5] focus:ring-[#36b7e5]"
                                />
                            </div>
                            <div>
                                <Label htmlFor="Country" className="text-sm font-medium">
                                    <span className="flex items-center">
                                        <Globe className="h-4 w-4 mr-2 text-[#36b7e5]" />
                                        Country
                                    </span>
                                </Label>
                                <Input
                                    id="Country"
                                    value={editedUser.Country || ""}
                                    onChange={(e) => handleProfileChange("Country", e.target.value)}
                                    className="mt-1.5 focus:border-[#36b7e5] focus:ring-[#36b7e5]"
                                />
                            </div>
                            <div>
                                <Label htmlFor="City" className="text-sm font-medium">
                                    <span className="flex items-center">
                                        <Building className="h-4 w-4 mr-2 text-[#36b7e5]" />
                                        City
                                    </span>
                                </Label>
                                <Input
                                    id="City"
                                    value={editedUser.City || ""}
                                    onChange={(e) => handleProfileChange("City", e.target.value)}
                                    className="mt-1.5 focus:border-[#36b7e5] focus:ring-[#36b7e5]"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditProfile(false)} className="border-gray-200">
                            Cancel
                        </Button>
                        <Button className="bg-[#0055a4] hover:bg-[#004080] text-white" onClick={saveProfile} disabled={isLoading.Profile}>
                            {isLoading.Profile ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 size={18} className="animate-spin" /> Saving...
                                </span>
                            ) : (
                                <>
                                    <span className="relative z-10">Save Changes</span>
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Dashboard
