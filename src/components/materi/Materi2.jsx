import React, { useState } from 'react';
import { Heart, Minus, Plus, Gamepad, Code, Coffee, Briefcase, Clock, Book }
from 'lucide-react';
import './Materi2.css';

const Materi2 = () => {
    const [list, setList] = useState([]);
    const [namaMatakuliah, setNamaMatakuliah] = useState('');
    const [namaDosen, setNamaDosen] = useState('');
    const [umur, setUmur] = useState(17);
    const hobbyMuda = ['Saya Suka bermain', 'Saya Suka ngoding', 'Saya Suka Makan'];
    const hobbyTua = ['Saya Suka bekerja', 'Saya Suka ngoding', 'Saya Suka lembur'];
    const getHobbyIcon = (hobby) => {
        if (hobby.includes('bermain')) return <Gamepad size={18} />;
        if (hobby.includes('ngoding')) return <Code size={18} />;
        if (hobby.includes('Makan')) return <Coffee size={18} />;   
        if (hobby.includes('bekerja')) return <Briefcase size={18} />;
        if (hobby.includes('lembur')) return <Clock size={18} />;
        return <Heart size={18} />;
    };
    const kurangUmur = () => {
        if (umur === 0) return;
        setUmur(umur - 1);
    };
    const tambahUmur = () => {
        setUmur(umur + 1);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        if (!namaMatakuliah.trim() || !namaDosen.trim()) return;
        setList(prevData => [
            ...prevData,
            { namaMatakuliah, namaDosen }
        ]);
        setNamaMatakuliah('');
        setNamaDosen('');
    };

    return (
        <div className="materi2-container">
            <h1 className="materi2-title">Implementasi useState</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="age-section">
                        <div className="age-display">
                            Umur Saya: {umur}
                            <span className={`age-status ${umur <= 25 ? 'status-young' : 'status-old'}`}>
                                {umur <= 25 ? '🌱 Masih Muda' : '🌟 Sudah Dewasa'}
                            </span>
                        </div>
                        <div className="age-buttons">
                            <button
                                className="age-button"
                                onClick={kurangUmur}
                                disabled={umur === 0}
                            >
                                <Minus size={18} className="inline mr-1" /> Kurang Umur
                            </button>
                            <button
                                className="age-button"
                                onClick={tambahUmur}
                            >
                                <Plus size={18} className="inline mr-1" /> Tambah Umur
                            </button>
                        </div>
                        <h6 className="text-cyan-400 mb-2">Hobi:</h6>
                        <ul className="hobbies-list">
                            {(umur <= 25 ? hobbyMuda : hobbyTua).map((hobby, index) => (
                                <li key={index} className="hobby-item">
                                    {getHobbyIcon(hobby)} {hobby}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="course-form">
                        <h5 className="text-cyan-400 mb-4">
                            <Book className="inline mr-2" /> List Mata Kuliah
                        </h5>   
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <label className="form-label">Nama Mata Kuliah</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={namaMatakuliah}
                                    onChange={(e) => setNamaMatakuliah(e.target.value)}
                                    required
                                    placeholder="Masukkan nama mata kuliah"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Nama Dosen</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={namaDosen}
                                    onChange={(e) => setNamaDosen(e.target.value)}
                                    required
                                    placeholder="Masukkan nama dosen"
                                />
                            </div>

                            <button type="submit" className="submit-btn">
                                Tambah Mata Kuliah
                            </button>
                        </form>

                        <div className="course-list">
                            <h5 className="course-list-title">Daftar Mata Kuliah</h5>
                            <ul className="course-items">
                                {list.map((item, index) => (
                                    <li key={index} className="course-item">
                                        <div className="course-name">📚
                                        {item.namaMatakuliah}</div>
                                        <div className="course-professor">👨‍🏫
                                        {item.namaDosen}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Materi2;