function MemoryCard(props) {
  let name = props.src.split(/[0-9]+/)[0];

  return (
    <img src={props.src} alt="" style={{width: "128px"}}/>
    <figcaption>title: {name}</figcaption>
  <figure data-key={props.id} className="memory-card" onClick={props.onClick}>
  </figure>
  );
}

export default MemoryCard;
