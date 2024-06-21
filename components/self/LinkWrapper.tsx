import Link from 'next/link';

const CustomLink = ({ children, onClick, ...props }:any) => {
  const handleClick = (event:any) => {
    event.stopPropagation();
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default CustomLink;
