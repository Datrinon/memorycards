import "../../css/MemoryCard.css"

function MemoryCard(props) {
  let matches = props.src.split("/");
  let name = matches[matches.length - 1].split(/[0-9]/)[0];
  name = name.replace("-", " ");

  return (
  <figure data-key={props.id} className="memory-card" onClick={props.onClick}>
    <img className="memory-card-image" src={props.src} alt=""/>
    <figcaption className="memory-card-label">{name}</figcaption>
  </figure>
  );
}

export default MemoryCard;
