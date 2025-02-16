import { Service } from '../fetch/hosts';
import './index.css';

interface ServiceTagProps {
  service: Service;
}

const ServiceTag = ({ service }: ServiceTagProps) => {
  return (
    <span className='service-tag'>{service.port}/{service.service_name}</span>
  );
};

export default ServiceTag;
