import './chef.scss';
import Slider from 'react-slick';
import axios from "axios";
import { useEffect, useState } from "react";

function Chef() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    const [dataChef, setDataChef] = useState([]);

    useEffect(() => {
        const apiUrl = 'http://localhost:3001/api/daubep';

        // Make the API call using Axios
        axios.get(apiUrl)
            .then(response => {
                // Handle successful response
                setDataChef(response.data.dataDauBep[0]);
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <>
            <section id="chef">
                <div className='section-specialty'>
                    <div className='specialty-container'>
                        <div className='specialty-header'>
                            <div className='edit-title'>Đầu bếp kinh nghiệm</div>
                            <span>-------------------------------------</span>
                        </div>
                        <Slider {...settings}>
                            {dataChef.map((chef, index) => (
                                <div key={index} className="card">
                                    <div className="img">
                                        <img src={chef.hinhanh} alt={`Chef ${index + 1}`} />
                                    </div>
                                    <span>-</span>
                                    <span><h4>{chef.ten}</h4></span>
                                    <p className="info">{chef.mota}</p>
                                    <div className="share">
                                        <a href={chef.lienketyt}><i className="fab fa-youtube"></i></a>
                                        <a href={chef.lienketfb}><i className="fab fa-facebook"></i></a>
                                        <a href={chef.lienketig}><i className="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Chef;