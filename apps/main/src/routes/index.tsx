import { Button } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <Button variant="contained">a</Button>
      <h3>Welcome Home!</h3>
    </div>
  );
}
