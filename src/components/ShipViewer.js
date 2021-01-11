const ShipViewer = (props) => {
  const segmentElem = <div className="health-segment"></div>;
  const hitSegmentElem = (
    <segmentElem className="health-segment hit"></segmentElem>
  );
  const shipName = (name) => name.slice(0, 1).toUpperCase() + name.slice(1);

  return (
    <div>
      {props.fleetData.map((ship) => (
        <div className="health-bar">
          {ship.length === ship.hits ? (
            <p className="sunk">{shipName(ship.name)}</p>
          ) : (
            <p>{shipName(ship.name)}</p>
          )}
          {(() => {
            let healthBar = [];
            if (props.obscureHits !== "true") {
              for (let i = 0; i < ship.length - ship.hits; i += 1) {
                healthBar.push(segmentElem);
              }
              for (let i = 0; i < ship.hits; i += 1) {
                healthBar.push(hitSegmentElem);
              }
            } else if (
              props.obscureHits === "true" &&
              ship.length === ship.hits
            ) {
              for (let i = 0; i < ship.hits; i += 1) {
                healthBar.push(hitSegmentElem);
              }
            } else {
              for (let i = 0; i < ship.length; i += 1) {
                healthBar.push(segmentElem);
              }
            }
            return healthBar;
          })()}
        </div>
      ))}
    </div>
  );
};

export default ShipViewer;
