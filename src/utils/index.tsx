
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties; // For inline styles
  id?: string; // For a container ID
}


const Container: React.FC<ContainerProps> = ({ children, className }) => {
    return <div className={container}>{children}</div>;
  };

  
  export default Container