import { Component } from '@angular/core';

@Component({
    selector: 'app-key-feature',
    templateUrl: './key-feature.component.html',
    styleUrls: ['./key-feature.component.css'],
    standalone: false
})
export class KeyFeatureComponent {
  icon: string = '../../assets/images/feature icon.png';
  features: any[] = [
    {
      title: 'RFID Technology Integration',
      description:
        'Improve efficiency with RFID features, enabling swift library material management and seamless user experiences.',
    },
    {
      title: 'Sound Sensor Integration',
      description:
        'Optimize systems using advanced sound sensors for precise library environment control and innovative applications.',
    },
    {
      title: 'Self-Service Kiosks',
      description:
        'Enhance user autonomy with modern self-service kiosks, reducing queues and providing a highly convenient library experience.',
    },
    {
      title: 'Customization Options',
      description:
        'Tailor the innovative library management system to meet the unique and specific needs of your library, ensuring unparalleled flexibility and adaptability.',
    },
    {
      title: 'Efficient Cataloging',
      description:
        'Streamline tasks with automated cataloging, ensuring easy access, organization, and efficient management of vast collections.',
    },
    {
      title: 'Integrated LMS',
      description:
        'Merge library resources seamlessly with educational content through LMS integration for a cohesive and enriching learning environment.',
    },
  ];
}
