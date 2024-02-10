import { useEffect, useState } from 'react';
import './index.scss';
import { API_URL } from '../../helpers/features/api';
import { Font } from '../../types';
import Navigation from '../../components/filters';
import { FiX } from 'react-icons/fi';

const GoogleFontLoader = ({ fontName, fontCategory }: { fontName: string, fontCategory: string }) => {
  useEffect(() => {
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@400;700&display=swap`;
    const link = document.createElement('link');
    link.href = fontUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [fontName]);

  return (
    <div className='font'>
      <div style={{ fontFamily: fontName, marginBottom: '20px' }} className='font-card'>
        <div className='font-card__box'>
          <h3>{fontName}</h3>
          <p>{fontCategory}</p>
        </div>
        <p className='whereas'>No one shall be held in slavery or servitude; slavery and the slave trade shall be prohibited in all their forms. <span className='fade-out'></span></p>
      </div>
    </div>
  );
};

const FontsDisplay = () => {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);

  // Panel ko'rinuvchanligini o'zgartiruvchi yangi funksiya
  const togglePreviewVisibility = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };



  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setFonts(data.items.slice(0, 300)));
  }, []);

  const filteredFonts = fonts.filter(font => {
    const matchesSearchTerm = font.family.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter ? font.category === selectedFilter : true;
    return matchesSearchTerm && matchesFilter;
  }
  );  
  
  return (
    <div className='home' style={{}}>
      <div  className='preview' style={{ transform: isPreviewVisible ? 'translateX(0)' : 'translateX(-100%)', display: isPreviewVisible ? 'flex' : 'none'}}>
        <div>
        <h2>Preview</h2>
        <FiX onClick={togglePreviewVisibility} />
        </div>
        <textarea placeholder='Type something'></textarea>
        <input type="range"/>
      </div>
      <div className="font-div" >
        <Navigation  onSearchChange={setSearchTerm} onFilterChange={setSelectedFilter}  onTogglePanel={togglePreviewVisibility}/>
        <div className='font-div__m'>
        {(searchTerm || selectedFilter ? filteredFonts : fonts).map((font) => (
          <GoogleFontLoader key={font.family} fontName={font.family} fontCategory={font.category} />
        ))}
        </div>
      </div>
    </div>
  );
};

export default FontsDisplay;
