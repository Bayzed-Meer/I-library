import { Component } from '@angular/core';

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.css'],
    standalone: false
})
export class ServiceComponent {
  icon: string = '../../assets/images/serviceIcon.png';
  arrow: string = '../../assets/images/arrow.png';
  image: string = '../../assets/images/service.gif';
  features = [
    {
      text: 'Utilization of RFID technology for real-time monitoring.',
      icon: 'double_arrow',
    },
    {
      text: 'Integration of IoT sensors to address issues like noise pollution.',
      icon: 'double_arrow',
    },
    {
      text: 'Tagging each book with RFID chips for real-time tracking of movements and availability.',
      icon: 'double_arrow',
    },
    {
      text: 'Automation of check-ins, check-outs, and real-time inventory management.',
      icon: 'double_arrow',
    },
    {
      text: 'Patrons can search, reserve, and check out books seamlessly through the web interface.',
      icon: 'double_arrow',
    },
    {
      text: 'Streamlining library processes to enhance efficiency and user experiences.',
      icon: 'double_arrow',
    },
    {
      text: 'Optimization of traditional library systems through IoT technology.',
      icon: 'double_arrow',
    },
    {
      text: 'Implementation of security measures to safeguard user information.',
      icon: 'double_arrow',
    },
    {
      text: "Ensuring the integrity of the library's digital infrastructure.",
      icon: 'double_arrow',
    },
    {
      text: 'Utilization of a centralized database for a seamlessly connected library ecosystem.',
      icon: 'double_arrow',
    },
    {
      text: 'Implementation of data analytics for insightful reporting on library operations.',
      icon: 'double_arrow',
    },
  ];
}
