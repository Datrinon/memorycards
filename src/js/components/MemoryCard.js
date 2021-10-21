function MemoryCard(props) {
  let name = props.src.split(/[0-9]+/)[0];

  return (
  <figure>
    <img src={props.src} alt="" style={{width: "128px"}}/>
    <figcaption>title: {name}</figcaption>
  </figure>
  );
}

export default MemoryCard;
