import { Hit } from '../fetch/hosts';
import ServiceTag from '../ServiceTag';
import './index.css';

interface HostProps {
  host: Hit
}

const Host = ({ host }: HostProps) => {
  const locationString = host.location.city && host.location.country
    ? `${host.location.city}, ${host.location.country}`
    : 'Unknown Location';
  return (
    <div className='host'>
      <header>
        <span className='ip-address'>{host.ip}</span>
        <span className='location' title={locationString}>{locationString}</span>
      </header>
      <div className='services'>
        <div>Services ({host.services.length})</div>
        <div className='tags'>
          {host.services.map((service) => <ServiceTag service={service} />)}
        </div>
      </div>
    </div>
  );
};

export default Host;
