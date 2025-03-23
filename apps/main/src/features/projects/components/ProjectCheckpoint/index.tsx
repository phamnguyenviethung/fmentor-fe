import { ProjectApi } from '@libs';
import ComponentLoader from '@main/components/Loader/ComponentLoader';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { TbCaretDownFilled } from 'react-icons/tb';
import dayjs from 'dayjs';

const CheckpointTask: React.FC<{
  checkpointId: string;
  projectId: string;
}> = ({ checkpointId, projectId }) => {
  const query = useQuery({
    queryKey: ['taskList', projectId, checkpointId],
    queryFn: () =>
      ProjectApi.getCheckpointTaskList({
        projectId,
        checkpointId,
      }),
  });

  if (query.isLoading) {
    return <ComponentLoader />;
  }

  return (
    <Box>
      {query.data?.items.map((t) => {
        return (
          <AccordionDetails key={t.code}>
            <Typography>{t.name}</Typography>
          </AccordionDetails>
        );
      })}
    </Box>
  );
};

const ProjectCheckpoint: React.FC<{
  projectId: string;
}> = () => {
  const cpQuery = useQuery({
    queryKey: ['checkpontList'],
    queryFn: ProjectApi.getCheckpointList,
  });

  if (cpQuery.isLoading) {
    return <ComponentLoader />;
  }

  return (
    <Box pb={20}>
      <Typography mb={2} variant="body1" fontWeight={600}>
        Checkpoints
      </Typography>

      <Stack spacing={2}>
        {cpQuery.data?.items.map((cp) => {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<TbCaretDownFilled />}
                aria-controls="checkpoint-content"
                id="checkpoint"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography component="p" fontWeight={500} variant="body1">
                    {cp.name}{' '}
                  </Typography>
                  <Typography component="span" color="gray" variant="body2">
                    {`${dayjs(cp.startTime).format('DD/MM/YYYY')} - ${dayjs(
                      cp.endTime
                    ).format('DD/MM/YYYY')}`}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <CheckpointTask checkpointId={cp.id} projectId="projectId" />
            </Accordion>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ProjectCheckpoint;
