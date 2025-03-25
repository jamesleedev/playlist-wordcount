import { zodResolver } from '@hookform/resolvers/zod';
import { RiLoader4Line, RiSearchLine } from '@remixicon/react';
import { type FC, useCallback, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Success, type SuccessProps } from '@/components/success/success';
import { getSuccessProps } from '@/components/success/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MESSAGES } from '@/constants';
import { type SearchResponse, type SpotifyData } from '@/types/form';

const FORM_STATE = {
  ERROR: 'error',
  IDLE: 'idle',
  SUBMITTING: 'submitting',
  SUCCESS: 'success',
};

const defaultValues = {
  spotify: '',
  word: '',
};

const schema = z.object({
  spotify: z
    .string()
    .min(1, { message: 'Spotify URL is required.' })
    .url({ message: 'Field must contain Spotify URL.' }),
  word: z.string().min(1, { message: 'Search term is required.' }),
});

export const Form: FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm<SpotifyData>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const [formState, setFormState] = useState(FORM_STATE.IDLE);
  const [stats, setStats] = useState<SuccessProps>({ count: 0, errors: 0 });

  const onSubmit: SubmitHandler<SpotifyData> = useCallback(
    async (data) => {
      setFormState(FORM_STATE.SUBMITTING);

      try {
        const response = await fetch('/api/search', {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });

        if (!response.ok) {
          setFormState(FORM_STATE.ERROR);
          const respJson: SearchResponse = await response.json();

          if (respJson.errors) {
            for (const [key, value] of Object.entries(respJson.errors)) {
              setError(key as keyof SpotifyData, { message: value });
            }
          }

          toast.error(respJson.msg);
        } else {
          const data: SearchResponse = await response.json();
          setStats(getSuccessProps(data));
          setFormState(FORM_STATE.SUCCESS);
          toast.success(data.msg);
        }
      } catch (e) {
        setFormState(FORM_STATE.ERROR);
        toast.error(MESSAGES.ERROR.GENERAL.IMPLEMENTATION);
        console.error(e);
      }
    },
    [setError]
  );

  return (
    <section className="pb-32">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[40rem]">
        <div>
          <Label htmlFor="spotify" className="mb-3">
            Public Spotify playlist URL: *
          </Label>
          <Input
            id="spotify"
            type="text"
            placeholder="https://open.spotify.com/playlist/..."
            className={errors.spotify?.message ? 'mb-2' : 'mb-10'}
            {...register('spotify')}
            aria-invalid={errors.spotify?.message ? 'true' : 'false'}
          />
          {errors.spotify?.message ? (
            <p className="mb-4 text-left text-xs leading-4 text-rose-700" role="alert">
              {errors.spotify.message}
            </p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="word" className="mb-3">
            Search term: *
          </Label>
          <Input
            id="word"
            type="text"
            className={errors.word?.message ? 'mb-2' : 'mb-10'}
            {...register('word')}
            aria-invalid={errors.word ? 'true' : 'false'}
            placeholder="Penelope"
          />
          {errors.word?.message ? (
            <p className="mb-4 text-left text-xs leading-4 text-rose-700" role="alert">
              {errors.word.message}
            </p>
          ) : null}
        </div>
        <Button
          type="submit"
          className="mt-4 hover:cursor-pointer"
          disabled={formState === FORM_STATE.SUBMITTING || !isValid || !isDirty}
        >
          {formState === FORM_STATE.SUBMITTING ? (
            <span className="flex items-center gap-2">
              <RiLoader4Line className="fill-primary-foreground size-4 animate-spin" />
              <span>Searching...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <RiSearchLine className="fill-primary-foreground size-4" />
              <span>Search</span>
            </span>
          )}
        </Button>
      </form>
      {formState === FORM_STATE.SUCCESS && <Success {...stats} />}
    </section>
  );
};
