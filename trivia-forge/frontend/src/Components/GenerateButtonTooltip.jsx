import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function GenerateButtonTooltip() {
  return (
    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Log in to generate a game.</Tooltip>}>
      <span className="d-inline-block">
        <Button disabled style={{ pointerEvents: 'none' }}>
          Generate
        </Button>
      </span>
    </OverlayTrigger>
  );
};

export default GenerateButtonTooltip;
