import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { MessageCircle, Send, Lock, CheckCircle, XCircle } from 'lucide-react';
import './Materi1.css';
function Materi1() {
    const [message, setMessage] = useState('Invalid');
    const [message2, setMessage2] = useState('');
    const [isEnable, setIsEnable] = useState(false);
    const [strength, setStrength] = useState(0);
    const notify = () => {
        toast.success('🎉 Berhasil Tersubmit!', {
            position: 'top-right',
            theme: 'dark',
        });
    };

    const textChangeHandler = (event) => {
        if (event.target.value.trim().length < 3) {
            setMessage('Invalid');
        } else {
            setMessage('Valid');
        }
    };

    const textDisableHandler = (event) => {
        const value = event.target.value;
        setIsEnable(value.trim().length >= 1);
        setStrength(Math.min(100, value.length * 10));
    };

    return (
        <div className="materi-container">
            <div className="materi-header">
                <h1 className="materi-title">Exploring useState Hook</h1>
                <p className="materi-subtitle">cara mengelola status dalam komponen React</p>
            </div>

            {/* Input Pertama - Validator */}
            <div className="input-section" style={{ '--index': 1 }}>
                <div className="input-group">
                    <label className="input-label">
                        <MessageCircle size={18} />
                        Validasi Pesan
                    </label>
                    <input
                        type="text"
                        className="custom-input"
                        placeholder="Ketik minimal 3 karakter..."
                        onChange={textChangeHandler}
                    />
                </div>
                <div className={`status-message ${message === 'Valid' ? 'status-valid' : 'status-invalid'}`}>
                    {message === 'Valid' ? <CheckCircle size={18} /> : <XCircle
                    size={18} />}
                    {message} message
                </div>
            </div>

            {/* Input Kedua - Echo */}
            <div className="input-section" style={{ '--index': 2 }}>
                <div className="input-group">
                    <label className="input-label">

                        <Send size={18} />
                        Ketik sesuatu maka akan tertapil di bawah secara real-time
                    </label>
                    <input
                        type="text"
                        className="custom-input"
                        placeholder="Ketik sesuatu..."
                        value={message2}
                        onChange={(e) => setMessage2(e.target.value)}
                    />
                </div>
                <div className="echo-message">
                    Echo: <span className="echo-text">{message2 || 'Waiting for input...'}</span>
                </div>
            </div>

            <div className="input-section" style={{ '--index': 3 }}>
                <div className="input-group">
                    <label className="input-label">
                        <Lock size={18} />
                        Submit Control
                    </label>
                    <input
                        type="text"
                        className="custom-input"
                        placeholder="Ketik untuk mengaktifkan tombol submit..."
                        onChange={textDisableHandler}
                    />
                    <div className="strength-bar">
                        <div className="strength-fill" style={{ width: `${strength}%` }}/>
                    </div>
                </div>
                <button className="submit-button" onClick={notify} disabled={!isEnable}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Materi1;