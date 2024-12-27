import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import "./Home.css"; 

const Home = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [courseList, setCourseList] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await axios.get("http://localhost:5000/students");
        setStudentCount(studentResponse.data.length);

        const staffResponse = await axios.get("http://localhost:5000/staff");
        setStaffCount(staffResponse.data.length);

        const courseResponse = await axios.get("http://localhost:5000/courses");
        setCourseList(courseResponse.data);

        const activitiesResponse = await axios.get("http://localhost:5000/activities");
        setRecentActivities(activitiesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="homepage">
      <center>
        <h1 className="homepage-title">Welcome to Grace Academy Admin Panel</h1>
        <h3 className="homepage-subtitle">Overview at a Grace</h3>
      </center>

      <div className="counts-container">
        <div className="box">
          <FaGraduationCap className="icon" />
          <h2>Students</h2>
          <h3>{studentCount}</h3>
        </div>
        <div className="box">
          <FaChalkboardTeacher className="icon" />
          <h2>Staff</h2>
          <h3>{staffCount}</h3>
        </div>
        <div className="box">
          <GiBookshelf className="icon" />
          <h2>Courses</h2>
          <h3>{courseList.length}</h3>
        </div>
      </div>

      <div className="courses-container">
        <h3 className="section-title">Courses Offered</h3>
        <ul className="course-list">
          {courseList.length > 0 ? (
            courseList.map((course) => (
              <li key={course.id}>{course.name}</li>
            ))
          ) : (
            <p>No courses available at the moment.</p>
          )}
        </ul>
      </div>

      <div className="activities-container">
        <h3 className="section-title">Recent Activities</h3>
        <ul className="activity-list">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <li key={index}>{activity.description}</li>
            ))
          ) : (
            <p>No recent activities.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
