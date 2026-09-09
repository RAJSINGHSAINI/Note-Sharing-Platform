import React, { useContext, useState } from 'react';
import Navbar from '../../components/layouts/Navbar';
import Footer from '../../components/layouts/Footer';
import {
    UploadCloud,
    FileText,
    X,
    CheckCircle2,
    AlertCircle,
    Building2,
    GraduationCap,
    BookOpen,
    Layers,
    FileCode2,
    ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { initiateUpload } from '../../api/notes.api';
import { AuthContext } from '../../context/AuthContext';

// Department to Courses Mapping
const DEPARTMENT_COURSES = {
    "Computing & Technology": [
        "BCA (Bachelor of Computer Applications)",
        "B.Tech Computer Science & Engineering",
        "B.Sc Information Technology",
        "B.Sc Computer Science",
        "MCA (Master of Computer Applications)",
        "Diploma in Computer Science",
        "M.Tech Software Engineering"
    ],
    "Business & Management": [
        "BBA (Bachelor of Business Administration)",
        "MBA (Master of Business Administration)",
        "B.Com (Bachelor of Commerce)",
        "BMS (Bachelor of Management Studies)",
        "Executive MBA"
    ],
    "Finance & Accounting": [
        "B.Com Accounting & Finance",
        "M.Com Finance",
        "Chartered Accountancy (CA Prep)",
        "ACCA / CFA Studies",
        "Banking & Insurance Management"
    ],
    "Engineering & Technology": [
        "B.Tech Mechanical Engineering",
        "B.Tech Electrical & Electronics",
        "B.Tech Civil Engineering",
        "B.Tech Electronics & Communication",
        "Diploma in Engineering"
    ],
    "Humanities & Social Sciences": [
        "BA Psychology",
        "BA English Literature",
        "BA Journalism & Mass Comm",
        "MA Political Science"
    ]
};

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.txt'];

const UploadNote = () => {
    const navigate = useNavigate();

    // Form State
    const [department, setDepartment] = useState('');
    const [course, setCourse] = useState('');
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState(''); // <--- Added Description State
    const [selectedFile, setSelectedFile] = useState(null);

    // UI / Validation States
    const [isDragging, setIsDragging] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // User context
    const { user } = useContext(AuthContext);

    // Department Change Handler
    const handleDepartmentChange = (e) => {
        const selectedDept = e.target.value;
        setDepartment(selectedDept);
        setCourse(''); // Reset course selection when department changes
    };

    // File Validation Handler
    const validateAndSetFile = (file) => {
        if (!file) return;

        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

        if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
            setErrorMessage(`Invalid file format! Allowed formats: ${ALLOWED_EXTENSIONS.join(', ')}`);
            setSelectedFile(null);
            return;
        }

        // Change client-side validation limit to 5 MB
        if (file.size > 5 * 1024 * 1024) {
            setErrorMessage('File size exceeds the 5 MB limit.');
            setSelectedFile(null);
            return;
        }

        setErrorMessage('');
        setSelectedFile(file);
    };

    // Drag and Drop Handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    // Input File Change Handler
    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    // Remove Selected File
    const handleRemoveFile = () => {
        setSelectedFile(null);
        setErrorMessage('');
    };

    // Form Submit Handler
   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!department || !course || !subject.trim() || !topic.trim() || !description.trim() || !selectedFile) {
        setErrorMessage('Please fill in all mandatory fields and attach a valid file.');
        return;
    }

    if (!user || (!user.id && !user.studentId)) {
        setErrorMessage('User session not found. Please log in again.');
        return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
        const studentId = user.id || user.studentId;

        // 1. Construct Multipart FormData (Combines metadata and file binary)
        const formData = new FormData();
        formData.append('studentId', studentId);
        formData.append('department', department);
        formData.append('course', course);
        formData.append('subject', subject);
        formData.append('topic', topic);
        formData.append('description', description);
        formData.append('file', selectedFile);

        // 2. Direct Server-to-Server Upload Request
        // Note: Do NOT set 'Content-Type' header manually; fetch sets multipart/form-data boundary automatically
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/notes/upload`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const serverMessage = errorData.message || errorData.error || `Upload failed (${response.statusText})`;
            throw new Error(serverMessage);
        }

        const data = await response.json();
        console.log('Upload successful:', data);

        setIsSubmitting(false);
        setIsSuccess(true);
    } catch (err) {
        setIsSubmitting(false);
        console.error('Upload Error:', err);

        const serverMessage = err.response?.data?.error || err.response?.data?.message || err.message;
        setErrorMessage(serverMessage || 'An error occurred during upload. Please try again.');
    }
};

    return (
        <div className="min-h-screen bg-gray-50/50 relative font-sans flex flex-col justify-between">
            {/* Background Subtle Pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <Navbar />

            <main className="relative z-10 max-w-3xl mx-auto px-4 py-10 w-full">
                {/* Header Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-200/80 rounded-full text-xs text-purple-700 font-semibold mb-3">
                        <UploadCloud className="w-3.5 h-3.5 text-purple-600" />
                        <span>Contribution Portal</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Upload & Share Study Material
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto">
                        Help fellow students by uploading organized lecture notes, summary guides, or code cheat sheets.
                    </p>
                </div>

                {/* Upload Form Card */}
                <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xl p-6 sm:p-10 relative overflow-hidden">

                    {/* Success Overlay state */}
                    {isSuccess ? (
                        <div className="py-12 flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-xs">
                                <CheckCircle2 className="w-9 h-9" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Successful!</h2>
                            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mb-6">
                                Your notes have been submitted successfully and are now accessible to students.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                <button
                                    onClick={() => {
                                        setIsSuccess(false);
                                        setDepartment('');
                                        setCourse('');
                                        setSubject('');
                                        setTopic('');
                                        setDescription('');
                                        setSelectedFile(null);
                                    }}
                                    className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                                >
                                    Upload Another File
                                </button>
                                <button
                                    onClick={() => navigate('/notes')}
                                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                    <span>Browse Repository</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Validation Error Alert */}
                            {errorMessage && (
                                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2.5">
                                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            {/* Grid 1: Department & Course Selection */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                {/* Department Select */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                        <Building2 className="w-3.5 h-3.5 text-purple-600" />
                                        Department <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={department}
                                        onChange={handleDepartmentChange}
                                        className="w-full px-3.5 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                                        required
                                    >
                                        <option value="" disabled>Select Department</option>
                                        {Object.keys(DEPARTMENT_COURSES).map((dept) => (
                                            <option key={dept} value={dept}>
                                                {dept}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Course Select */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                        <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                                        Course <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={course}
                                        onChange={(e) => setCourse(e.target.value)}
                                        disabled={!department}
                                        className="w-full px-3.5 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        required
                                    >
                                        <option value="" disabled>
                                            {department ? "Select Course" : "First select a department"}
                                        </option>
                                        {department &&
                                            DEPARTMENT_COURSES[department].map((crs) => (
                                                <option key={crs} value={crs}>
                                                    {crs}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                            </div>

                            {/* Grid 2: Subject & Topic Inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                {/* Subject Name Input */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                        <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                                        Subject Name <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="e.g. Data Structures, Accounting"
                                        className="w-full px-3.5 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all placeholder:text-gray-400"
                                        required
                                    />
                                </div>

                                {/* Topic / Chapter Input */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                        <Layers className="w-3.5 h-3.5 text-purple-600" />
                                        Topic / Chapter Covered <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        placeholder="e.g. Binary Trees, Ledger Posting"
                                        className="w-full px-3.5 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all placeholder:text-gray-400"
                                        required
                                    />
                                </div>

                            </div>

                            {/* Description / Summary Field */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                                    <FileCode2 className="w-3.5 h-3.5 text-purple-600" />
                                    Description / Note Summary <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Provide a brief summary of what these notes cover (e.g. Key formulas, solved exam questions, module summary)..."
                                    className="w-full px-3.5 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all placeholder:text-gray-400 resize-none"
                                    required
                                />
                            </div>

                            {/* Drag and Drop File Upload Area */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                    Attachment / File Upload <span className="text-rose-500">*</span>
                                </label>

                                {!selectedFile ? (
                                    <div
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${isDragging
                                            ? 'border-purple-600 bg-purple-50/50 scale-[1.01]'
                                            : 'border-gray-200 hover:border-purple-400 bg-gray-50/40 hover:bg-purple-50/20'
                                            }`}
                                    >
                                        <input
                                            type="file"
                                            id="file-upload"
                                            accept=".pdf,.doc,.docx,.txt"
                                            onChange={handleFileInputChange}
                                            className="hidden"
                                        />
                                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                                            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                                                <UploadCloud className="w-6 h-6" />
                                            </div>
                                            <p className="text-xs font-bold text-gray-800">
                                                Drag and drop your file here, or <span className="text-purple-600 underline">browse</span>
                                            </p>
                                            <p className="text-[11px] text-gray-400 mt-1">
                                                Supported formats: PDF, DOC, DOCX, TXT (Max size: 5 MB)
                                            </p>
                                        </label>
                                    </div>
                                ) : (
                                    /* Attached File Preview Bar */
                                    <div className="flex items-center justify-between p-4 bg-purple-50/60 border border-purple-200 rounded-xl">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div className="truncate">
                                                <p className="text-xs font-bold text-gray-900 truncate">{selectedFile.name}</p>
                                                <p className="text-[10px] text-gray-500">
                                                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleRemoveFile}
                                            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Document Extension Disclaimer Note */}
                            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-[11px] text-gray-500 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                                <span>
                                    <strong>Note:</strong> Only document formats (<strong>.pdf</strong>, <strong>.doc</strong>, <strong>.docx</strong>, <strong>.txt</strong>) are accepted. Executable files, zip archives, or images will be rejected.
                                </span>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 px-6 bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Uploading Notes...</span>
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud className="w-4 h-4" />
                                        <span>Submit and Publish Notes</span>
                                    </>
                                )}
                            </button>

                        </form>
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default UploadNote;