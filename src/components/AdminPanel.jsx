import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login, logout } from '../services/authService';
import useCollection from '../hooks/useCollection';
import { addData, updateData, deleteData, uploadFile } from '../services/firebaseService';
import toast from 'react-hot-toast';

// Login Component
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success('Logged in successfully!');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-medium">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">Login</button>
                </form>
            </div>
        </div>
    );
};

// Admin Dashboard Component
const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('projects');

    const handleLogout = async () => {
        await logout();
        toast.success('Logged out.');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
            </header>
            <nav className="p-4 bg-gray-200">
                <button onClick={() => setActiveTab('projects')} className={`px-4 py-2 mr-2 rounded ${activeTab === 'projects' ? 'bg-primary text-white' : ''}`}>Projects</button>
                <button onClick={() => setActiveTab('testimonials')} className={`px-4 py-2 mr-2 rounded ${activeTab === 'testimonials' ? 'bg-primary text-white' : ''}`}>Testimonials</button>
                <button onClick={() => setActiveTab('contacts')} className={`px-4 py-2 rounded ${activeTab === 'contacts' ? 'bg-primary text-white' : ''}`}>Contacts</button>
            </nav>
            <main className="p-8">
                {activeTab === 'projects' && <ManageProjects />}
                {activeTab === 'testimonials' && <ManageTestimonials />}
                {activeTab === 'contacts' && <ManageContacts />}
            </main>
        </div>
    );
};

// Manage Projects Section
const ManageProjects = () => {
    const { data: projects, loading, error, refresh } = useCollection('projects');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !category || !imageFile) {
            toast.error('All fields including image are required.');
            return;
        }
        try {
            const imageUrl = await uploadFile(imageFile, `projects/${imageFile.name}`);
            await addData('projects', { title, category, imageUrl });
            toast.success('Project added!');
            setTitle('');
            setCategory('');
            setImageFile(null);
            refresh();
        } catch (err) {
            toast.error('Failed to add project.');
        }
    };
    
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            await deleteData('projects', id);
            toast.success('Project deleted.');
            refresh();
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-8">
                {/* Form fields */}
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-2 mr-2"/>
                <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" className="border p-2 mr-2"/>
                <input type="file" onChange={e => setImageFile(e.target.files[0])} className="border p-2 mr-2"/>
                <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Project</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error loading data</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.map(p => (
                    <div key={p.id} className="bg-white p-4 rounded shadow">
                        <img src={p.imageUrl} alt={p.title} className="w-full h-32 object-cover mb-2" />
                        <h3 className="font-bold">{p.title}</h3>
                        <p>{p.category}</p>
                        <button onClick={() => handleDelete(p.id)} className="text-red-500 mt-2">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Placeholder for other management components
const ManageTestimonials = () => <div>Testimonials Management Coming Soon...</div>;
const ManageContacts = () => {
     const { data: contacts, loading, error } = useCollection('contacts');
     return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error loading messages</p>}
            <div className="space-y-4">
                {contacts.map(c => (
                    <div key={c.id} className="bg-white p-4 rounded shadow">
                       <p><strong>Name:</strong> {c.name}</p>
                       <p><strong>Email:</strong> {c.email}</p>
                       <p><strong>Message:</strong> {c.message}</p>
                    </div>
                ))}
            </div>
        </div>
     );
};

const AdminPanel = () => {
    const { user } = useAuth();
    return user ? <Dashboard /> : <Login />;
};

export default AdminPanel;
                        
