
function MemoryCard(props) {
  let matches = props.src.split("/");
  let name = matches[matches.length - 1].split(/0-9+/)[0];

  return (
  <figure data-key={props.id} className="memory-card" onClick={props.onClick}>
    <img className="memory-card-image" src={props.src} alt="" style={{width: "128px"}}/>
    <figcaption className="memory-card-label">title: {name}</figcaption>
  </figure>
  );
}

export default MemoryCard;
