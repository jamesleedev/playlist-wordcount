import { zodResolver } from '@hookform/resolvers/zod';
import { type FC, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormInputs {
  spotify: string;
  word: string;
}

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
    formState: { errors, isValid, isDirty },
  } = useForm<FormInputs>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const [formState, setFormState] = useState(FORM_STATE.IDLE);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[40rem]">
      <div>
        <Label htmlFor="spotify" className="mb-3">
          Spotify share URL: *
        </Label>
        <Input
          id="spotify"
          type="text"
          placeholder="https://open.spotify.com/playlist/..."
          className={errors.spotify?.message ? 'mb-2' : 'mb-12'}
          {...register('spotify')}
          aria-invalid={errors.spotify?.message ? 'true' : 'false'}
        />
        {errors.spotify?.message ? (
          <p className="mb-6 text-left text-xs leading-4 text-rose-700" role="alert">
            {errors.spotify.message}
          </p>
        ) : null}
      </div>
      <div>
        <Label htmlFor="word" className="mb-3">
          Search term *
        </Label>
        <Input
          id="word"
          type="text"
          className={errors.word?.message ? 'mb-2' : 'mb-12'}
          {...register('word')}
          aria-invalid={errors.word ? 'true' : 'false'}
        />
        {errors.word?.message ? (
          <p className="mb-6 text-left text-xs leading-4 text-rose-700" role="alert">
            {errors.word.message}
          </p>
        ) : null}
      </div>
      <Button
        type="submit"
        className="mt-8 cursor-pointer disabled:cursor-not-allowed"
        disabled={formState === FORM_STATE.SUBMITTING || !isValid || !isDirty}
      >
        Search
      </Button>
    </form>
  );
};
