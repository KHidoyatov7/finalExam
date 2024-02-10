export type Font = {
    family: string;
    category: string;
  }
  interface NavigationProps {
    onSearchChange: (newSearchTerm: string) => void;
    onFilterChange: (newFilter: string) => void;
    onTogglePanel?: () => void; // Qo'shimcha prop sifatida qo'shilgan
  }
  
  export default NavigationProps