const Card = (props) => {
  return (
    <>
      <div className='card-container'>
        <div className='box-container'>{props.children}</div>
      </div>
    </>
  );
};

export default Card;
