
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProviderProfileForm() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        phone: localStorage.getItem("phone") || "",
        service: "",
        experience: "",
        price: "",
        description: "",
        address: "",
        skills: [],
        available: true,
        image: "",
        gallery: []
    });

    const [preview, setPreview] = useState("");
    const [galleryPreview, setGalleryPreview] = useState([]);

    const [isEditing, setIsEditing] = useState(false);

    const serviceOptions = [
        "Electrician",
        "Plumber",
        "Carpenter",
        "Painter",
        "Cleaning",
        "AC Repair",
        "Mechanic",
        "RO Repair",
        "Appliance Repair",
        "Other"
    ];

    const skillOptions = [
        "Repair",
        "Installation",
        "Maintenance",
        "Inspection",
        "Emergency Service"
    ];

    // Load existing profile for editing

    useEffect(() => {
        const editingId = localStorage.getItem(
            "editingProviderProfileId"
        );

        if (!editingId) {
            setIsEditing(false);
            return;
        }

        const savedProfiles = JSON.parse(
            localStorage.getItem("providerProfiles") || "[]"
        );

        const savedProfile = savedProfiles.find(
            (item) => item.id === editingId
        );

        if (savedProfile) {
            setProfile(savedProfile);
            setPreview(savedProfile.image || "");
            setGalleryPreview(savedProfile.gallery || []);
            setIsEditing(true);
        }
    }, []);

    // Handle input changes

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Profile image selection

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Profile image must be smaller than 2 MB.");
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setPreview(reader.result);

            setProfile((prev) => ({
                ...prev,
                image: reader.result
            }));
        };

        reader.readAsDataURL(file);
    };

    // Remove profile image

    const removeImage = () => {
        setPreview("");

        setProfile((prev) => ({
            ...prev,
            image: ""
        }));
    };

    // Select skills

    const handleSkillChange = (skill) => {
        setProfile((prev) => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter((item) => item !== skill)
                : [...prev.skills, skill]
        }));
    };

    // Gallery image selection

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length + galleryPreview.length > 5) {
            alert("You can upload maximum 5 gallery images.");
            return;
        }

        const validFiles = files.filter((file) => {
            if (!file.type.startsWith("image/")) return false;

            if (file.size > 2 * 1024 * 1024) {
                alert(`${file.name} is larger than 2 MB.`);
                return false;
            }

            return true;
        });

        Promise.all(
            validFiles.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();

                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            })
        ).then((images) => {
            setGalleryPreview((prev) => [...prev, ...images]);

            setProfile((prev) => ({
                ...prev,
                gallery: [...prev.gallery, ...images]
            }));
        });

        e.target.value = "";
    };

    // Remove gallery image

    const removeGalleryImage = (index) => {
        const updatedImages = galleryPreview.filter(
            (_, i) => i !== index
        );

        setGalleryPreview(updatedImages);

        setProfile((prev) => ({
            ...prev,
            gallery: updatedImages
        }));
    };

    // Save profile

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !profile.name.trim() ||
            !profile.phone.trim() ||
            !profile.service ||
            !profile.price ||
            !profile.address.trim()
        ) {
            alert("Please fill all required fields.");
            return;
        }

        if (!/^\d{10}$/.test(profile.phone)) {
            alert("Enter a valid 10 digit phone number.");
            return;
        }

        try {
            const existingProfiles = JSON.parse(
                localStorage.getItem("providerProfiles") || "[]"
            );

            const editingId = localStorage.getItem(
                "editingProviderProfileId"
            );

            const oldProfile = existingProfiles.find(
                (item) => item.id === editingId
            );

            const finalProfile = {
                ...profile,
                id: editingId || Date.now().toString(),
                price: Number(profile.price),
                experience: profile.experience || "Beginner",
                rating: oldProfile?.rating || 0,
                reviews: oldProfile?.reviews || 0,
                verified: oldProfile?.verified || false,
                createdAt: oldProfile?.createdAt || new Date().toISOString(),
            };

            let updatedProfiles;

            if (editingId) {
                updatedProfiles = existingProfiles.map((item) =>
                    item.id === editingId ? finalProfile : item
                );
            } else {
                updatedProfiles = [
                    ...existingProfiles,
                    finalProfile
                ];
            }

            localStorage.setItem(
                "providerProfiles",
                JSON.stringify(updatedProfiles)
            );

            localStorage.setItem(
                "ownProviderProfile",
                JSON.stringify(finalProfile)
            );

            localStorage.removeItem("editingProviderProfileId");

            localStorage.setItem("role", "provider");

            alert(
                editingId
                    ? "Profile updated successfully!"
                    : "New provider profile created successfully!"
            );

            navigate("/provider-dashboard");

        } catch (error) {
            alert("Storage limit reached. Please use smaller images.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-10">

            {/* HEADER */}

            <header className="bg-white border-b border-gray-100 sticky top-0 z-40">

                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-gray-100 text-xl"
                    >
                        ←
                    </button>

                    <div>
                        <h1 className="font-bold text-gray-900">
                            {isEditing ? "Edit Your Profile" : "Create Your Profile"}
                        </h1>

                        <p className="text-xs text-gray-500">
                            Build your professional identity
                        </p>
                    </div>

                </div>

            </header>


            <main className="max-w-4xl mx-auto px-4 py-7">

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* PROFILE PHOTO */}

                    <section className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-100">

                        <h2 className="text-lg font-bold text-gray-900">
                            Profile Photo
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Upload a clear photo so customers can recognize you.
                        </p>

                        <div className="mt-6 flex flex-col sm:flex-row items-center gap-5">

                            <div className="w-32 h-32 rounded-2xl bg-blue-50 border-2 border-dashed border-blue-200 overflow-hidden flex items-center justify-center">

                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Profile preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-5xl">👤</span>
                                )}

                            </div>

                            <div className="flex flex-wrap gap-3">

                                <label className="cursor-pointer px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700">

                                    Upload Photo

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                </label>

                                {preview && (
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="px-5 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-semibold"
                                    >
                                        Remove Photo
                                    </button>
                                )}

                                <p className="w-full text-xs text-gray-400">
                                    JPG, PNG or WEBP · Maximum 2 MB
                                </p>

                            </div>

                        </div>

                    </section>


                    {/* PERSONAL INFORMATION */}

                    <section className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-100">

                        <h2 className="text-lg font-bold text-gray-900">
                            Personal Information
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-5 mt-5">

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Full Name *
                                </label>

                                <input
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Mobile Number *
                                </label>

                                <input
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    maxLength={10}
                                    placeholder="10 digit mobile number"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                        </div>

                    </section>


                    {/* PROFESSIONAL INFORMATION */}

                    <section className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-100">

                        <h2 className="text-lg font-bold text-gray-900">
                            Professional Information
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-5 mt-5">

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Service Category *
                                </label>

                                <select
                                    name="service"
                                    value={profile.service}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select your service</option>

                                    {serviceOptions.map((service) => (
                                        <option key={service} value={service}>
                                            {service}
                                        </option>
                                    ))}

                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Experience
                                </label>

                                <input
                                    name="experience"
                                    value={profile.experience}
                                    onChange={handleChange}
                                    placeholder="e.g. 5 Years"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Starting Price (₹) *
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    name="price"
                                    value={profile.price}
                                    onChange={handleChange}
                                    placeholder="Enter starting price"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Availability
                                </label>

                                <select
                                    name="available"
                                    value={String(profile.available)}
                                    onChange={(e) =>
                                        setProfile((prev) => ({
                                            ...prev,
                                            available: e.target.value === "true"
                                        }))
                                    }
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:border-blue-500"
                                >
                                    <option value="true">Available</option>
                                    <option value="false">Busy</option>
                                </select>
                            </div>

                        </div>


                        {/* SKILLS */}

                        <div className="mt-6">

                            <label className="block text-sm font-semibold mb-3">
                                Your Skills
                            </label>

                            <div className="flex flex-wrap gap-2">

                                {skillOptions.map((skill) => (

                                    <button
                                        key={skill}
                                        type="button"
                                        onClick={() => handleSkillChange(skill)}
                                        className={`px-4 py-2 rounded-full text-sm border transition ${profile.skills.includes(skill)
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white text-gray-600 border-gray-200"
                                            }`}
                                    >
                                        {profile.skills.includes(skill) ? "✓ " : "+ "}
                                        {skill}
                                    </button>

                                ))}

                            </div>

                        </div>


                        {/* ABOUT */}

                        <div className="mt-6">

                            <label className="block text-sm font-medium mb-2">
                                About Your Work
                            </label>

                            <textarea
                                name="description"
                                value={profile.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Describe your experience and services..."
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
                            />

                        </div>

                    </section>


                    {/* LOCATION */}

                    <section className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-100">

                        <h2 className="text-lg font-bold text-gray-900">
                            Service Location
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Where do you provide your services?
                        </p>

                        <textarea
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Enter your complete address, city and PIN code"
                            className="w-full mt-5 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
                            required
                        />

                    </section>


                    {/* WORK GALLERY */}

                    <section className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-100">

                        <h2 className="text-lg font-bold text-gray-900">
                            Work Gallery
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Show customers examples of your previous work.
                        </p>

                        <label className="mt-5 flex flex-col items-center justify-center border-2 border-dashed border-blue-200 bg-blue-50 rounded-2xl p-8 cursor-pointer hover:bg-blue-100 transition">

                            <span className="text-3xl">📸</span>

                            <span className="mt-3 text-sm font-semibold text-blue-700">
                                Upload Work Images
                            </span>

                            <span className="mt-1 text-xs text-gray-500">
                                Maximum 5 images, 2 MB each
                            </span>

                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleGalleryChange}
                                className="hidden"
                            />

                        </label>


                        {galleryPreview.length > 0 && (

                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-5">

                                {galleryPreview.map((image, index) => (

                                    <div
                                        key={index}
                                        className="relative aspect-square rounded-xl overflow-hidden"
                                    >

                                        <img
                                            src={image}
                                            alt={`Work ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeGalleryImage(index)}
                                            className="absolute top-1 right-1 w-7 h-7 bg-white text-red-500 rounded-full shadow"
                                        >
                                            ×
                                        </button>

                                    </div>

                                ))}

                            </div>

                        )}

                    </section>


                    {/* SUBMIT */}

                    <div className="flex flex-col sm:flex-row gap-3">

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 py-4 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex-1 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition"
                        >
                            {isEditing
                                ? "Save Changes"
                                : "Create Provider Profile →"}
                        </button>

                    </div>

                </form>

            </main>

        </div>
    );
}

export default ProviderProfileForm;
