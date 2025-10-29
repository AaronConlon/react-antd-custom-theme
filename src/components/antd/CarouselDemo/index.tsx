import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  height: 160,
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function CarouselDemo() {
  return (
    <Carousel autoplay>
      {[1, 2, 3, 4].map((item) => (
        <div key={item}>
          <h3 style={contentStyle}>幻灯片 {item}</h3>
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselDemo;
