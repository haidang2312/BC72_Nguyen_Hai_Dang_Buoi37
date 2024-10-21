import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function StudentForm() {
    const [student, setStudent] = useState({
        ma: "",
        name: "",
        sdt: "",
        email: "",
    });
    const [errors, setErrors] = useState({});
    
    // Lấy danh sách sinh viên hiện có từ Redux
    const students = useSelector((state) => state.studentReducer.students);
    const dispatch = useDispatch();

    const validate = () => {
        let newErrors = {};

        // Mã SV phải là số
        if (!student.ma || !/^\d+$/.test(student.ma)) {
            newErrors.ma = 'Mã sinh viên phải là số và không được để trống';
        }

        // Kiểm tra trùng mã sinh viên
        const existingStudent = students.find(s => s.ma === student.ma);
        if (existingStudent) {
            newErrors.ma = 'Mã sinh viên đã tồn tại';
        }

        // Tên không chứa số và ký tự đặc biệt
        if (!student.name || /[0-9~`!@#$%^&*()_+=\-[\]\\';,/{}|\\":<>?]/.test(student.name)) {
            newErrors.name = 'Tên không được chứa số hoặc ký tự đặc biệt';
        }

        // Email phải đúng định dạng
        if (!student.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(student.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        // Số điện thoại phải là số và bắt đầu bằng số 0
        if (!student.sdt || !/^0\d*$/.test(student.sdt)) {
            newErrors.sdt = 'Số điện thoại phải bắt đầu bằng số 0 và chỉ chứa số';
        }

        // Kiểm tra tất cả các trường không được để trống
        if (!student.ma || !student.name || !student.sdt || !student.email) {
            newErrors.general = 'Tất cả các trường đều bắt buộc';
        }

        setErrors(newErrors);

        // Trả về true nếu không có lỗi
        return Object.keys(newErrors).length === 0;
    };

    const handleChangeForm = (e) => {
        const { value, name } = e.target;
        let newStudentForm = { ...student, [name]: value }
        setStudent(newStudentForm)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch({ type: 'ADD_STUDENT', payload: student });
            setStudent({ ma: '', name: '', sdt: '', email: '' });
            setErrors({});
        }
    };

    return (
        <div>
            <div className="container">
                <div className="card text-left">
                    <div className='card-header bg-dark text-white'>Thông tin sinh viên</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="form-group col-6">
                                    <span>Mã SV</span>
                                    <input className='form-control' name="ma" value={student.ma} onChange={handleChangeForm} />
                                    {errors.ma && <p className="text-danger">{errors.ma}</p>}
                                </div>
                                <div className="form-group col-6">
                                    <span>Họ tên</span>
                                    <input className='form-control' name="name" value={student.name} onChange={handleChangeForm} />
                                    {errors.name && <p className="text-danger">{errors.name}</p>}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="form-group col-6">
                                    <span>Số điện thoại</span>
                                    <input className='form-control' name="sdt" value={student.sdt} onChange={handleChangeForm} />
                                    {errors.sdt && <p className="text-danger">{errors.sdt}</p>}
                                </div>
                                <div className="form-group col-6">
                                    <span>Email</span>
                                    <input className='form-control' name="email" value={student.email} onChange={handleChangeForm} />
                                    {errors.email && <p className="text-danger">{errors.email}</p>}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <button type='submit' className='btn btn-success'>Thêm sinh viên</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
