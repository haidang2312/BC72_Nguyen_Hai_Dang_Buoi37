import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function StudentTable() {
    // State để lưu từ khóa tìm kiếm và danh sách sinh viên đã lọc
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);

    // Lấy danh sách sinh viên từ Redux store
    const data = useSelector((state) => state.studentReducer.students);
    const dispatch = useDispatch();
    
    const [isEditing, setIsEditing] = useState(false);
    const [currentStudent, setCurrentStudent] = useState({
        ma: '',
        name: '',
        sdt: '',
        email: '',
    });

    // Cập nhật danh sách sinh viên lọc khi dữ liệu hoặc từ khóa tìm kiếm thay đổi
    useEffect(() => {
        setFilteredStudents(
            data.filter((student) =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.sdt.includes(searchTerm) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [data, searchTerm]);

    const handleDelete = (id) => {
        dispatch({ type: 'DELETE_STUDENT', payload: id });
    };

    const handleEdit = (student) => {
        setCurrentStudent(student);
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentStudent({ ...currentStudent, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'EDIT_STUDENT', payload: currentStudent });
        setIsEditing(false); // Đóng form chỉnh sửa sau khi cập nhật
    };

    const renderStudent = () => {
        return filteredStudents.map((student) => { // Sử dụng danh sách sinh viên đã lọc
            return (
                <tr key={student.ma}>
                    <td>{student.ma}</td>
                    <td>{student.name}</td>
                    <td>{student.sdt}</td>
                    <td>{student.email}</td>
                    <td>
                        <button className='btn btn-success' onClick={() => handleEdit(student)}>Chỉnh sửa</button>
                        <button className='btn btn-danger' onClick={() => handleDelete(student.ma)}>Xoá sinh viên</button>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className='container'>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm sinh viên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <table className='table'>
                <thead>
                    <tr>
                        <th>Mã SV</th>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {renderStudent()}
                </tbody>
            </table>
            
            {isEditing && (
                <div>
                    <h2>Chỉnh sửa sinh viên</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="ma"
                            placeholder="Mã SV"
                            value={currentStudent.ma}
                            onChange={handleChange}
                            disabled 
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Họ tên"
                            value={currentStudent.name}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="sdt"
                            placeholder="Số điện thoại"
                            value={currentStudent.sdt}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={currentStudent.email}
                            onChange={handleChange}
                        />
                        <button type="submit">Cập nhật</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Hủy</button>
                    </form>
                </div>
            )}
        </div>
    );
}
