'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Droplet, Dumbbell, Sparkles, Target, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/features/auth/context/MockAuthProvider'
import { ROUTES, HEALTH_GOALS, ACTIVITY_LEVELS, DIETARY_PREFERENCES, ALLERGENS } from '@/lib/constants'
import { toast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'

// ── Validation Schemas per Step ──────────────────────────────
const step1Schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.coerce.number().min(1, 'Age is required').max(120),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  height_cm: z.coerce.number().min(50, 'Height must be valid').max(300),
  weight_kg: z.coerce.number().min(20, 'Weight must be valid').max(500),
})

const step2Schema = z.object({
  goal: z.enum(['lose_weight', 'maintain_weight', 'gain_muscle', 'improve_fitness', 'eat_healthier']),
  target_weight_kg: z.coerce.number().min(20, 'Weight must be valid').max(500).optional(),
})

const step3Schema = z.object({
  activity_level: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active']),
})

const step4Schema = z.object({
  dietary_preference: z.enum(['none', 'vegetarian', 'vegan', 'pescatarian', 'keto', 'paleo', 'mediterranean', 'gluten_free', 'dairy_free']),
  allergens: z.array(z.string()),
})

const step5Schema = z.object({
  water_goal_ml: z.coerce.number().min(500, 'Minimum water goal is 500ml').max(10000),
  unit_system: z.enum(['metric', 'imperial']),
})

const onboardingSchema = step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema).merge(step5Schema)
type OnboardingFormValues = z.infer<typeof onboardingSchema>

export function OnboardingForm() {
  const { completeOnboarding } = useAuth()
  const [step, setStep] = React.useState(1)
  const totalSteps = 5

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: '',
      age: 25,
      gender: 'prefer_not_to_say',
      height_cm: 170,
      weight_kg: 70,
      goal: 'maintain_weight',
      target_weight_kg: 70,
      activity_level: 'moderately_active',
      dietary_preference: 'none',
      allergens: [],
      water_goal_ml: 2500,
      unit_system: 'metric',
    },
    mode: 'onTouched',
  })

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = form

  const watchGoal = watch('goal')
  const watchDietary = watch('dietary_preference')
  const watchAllergens = watch('allergens') || []
  const watchActivity = watch('activity_level')
  const watchUnit = watch('unit_system')

  const nextStep = async () => {
    // Validate current step before proceeding
    const fieldsToValidate =
      step === 1
        ? ['name', 'age', 'gender', 'height_cm', 'weight_kg']
        : step === 2
        ? ['goal', 'target_weight_kg']
        : step === 3
        ? ['activity_level']
        : step === 4
        ? ['dietary_preference', 'allergens']
        : ['water_goal_ml', 'unit_system']

    const isStepValid = await trigger(fieldsToValidate as any)
    if (isStepValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: OnboardingFormValues) => {
    try {
      await completeOnboarding(data as any)
      toast.success('Setup completed!', 'Welcome to NutriTrack AI.')
      window.location.href = ROUTES.DASHBOARD
    } catch (err: any) {
      toast.error('Onboarding failed', err?.message || 'Please check your inputs and retry.')
    }
  }

  // Animation variants
  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  }

  return (
    <Card className="w-full max-w-xl mx-auto border-border bg-card shadow-lg transition-all duration-slow">
      <CardHeader className="space-y-1.5 pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <CardDescription className="text-xs font-semibold uppercase tracking-wider text-accent">
            Step {step} of {totalSteps}
          </CardDescription>
          <div className="flex h-1.5 w-24 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
            <div
              className="bg-accent transition-all duration-slow"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
        <CardTitle className="text-xl md:text-2xl font-bold tracking-tight">
          {step === 1 && 'Tell us about yourself'}
          {step === 2 && 'What is your primary goal?'}
          {step === 3 && 'Choose your activity level'}
          {step === 4 && 'Dietary preference & allergens'}
          {step === 5 && 'Configure your daily targets'}
        </CardTitle>
        <CardDescription className="text-sm">
          {step === 1 && 'We use this to calculate your base metabolic rate.'}
          {step === 2 && 'We will tailor your daily caloric budget to this goal.'}
          {step === 3 && 'Activity multiplier will adjust your target calorie burn.'}
          {step === 4 && 'This helps us filter recommendations and food warnings.'}
          {step === 5 && 'Set your hydration target and units.'}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6 min-h-[300px]">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="name">Preferred Name</Label>
                  <Input
                    id="name"
                    placeholder="Alex"
                    error={!!errors.name}
                    {...register('name')}
                  />
                  {errors.name && <p className="text-xs text-danger">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      error={!!errors.age}
                      {...register('age')}
                    />
                    {errors.age && <p className="text-xs text-danger">{errors.age.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="gender">Gender</Label>
                    <select
                      id="gender"
                      className={cn(
                        'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm',
                        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0',
                        'text-foreground'
                      )}
                      {...register('gender')}
                    >
                      <option value="prefer_not_to_say">Prefer not to say</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="height_cm">Height (cm)</Label>
                    <Input
                      id="height_cm"
                      type="number"
                      error={!!errors.height_cm}
                      {...register('height_cm')}
                    />
                    {errors.height_cm && <p className="text-xs text-danger">{errors.height_cm.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="weight_kg">Weight (kg)</Label>
                    <Input
                      id="weight_kg"
                      type="number"
                      error={!!errors.weight_kg}
                      {...register('weight_kg')}
                    />
                    {errors.weight_kg && <p className="text-xs text-danger">{errors.weight_kg.message}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <div className="grid gap-3">
                  {HEALTH_GOALS.map((g) => (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => setValue('goal', g.value as any, { shouldValidate: true })}
                      className={cn(
                        'flex items-center gap-3 w-full text-left p-3.5 rounded-xl border transition-all text-sm',
                        watchGoal === g.value
                          ? 'border-accent bg-accent-subtle/50 text-accent font-medium'
                          : 'border-border bg-card text-foreground hover:bg-muted'
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                          watchGoal === g.value ? 'border-accent text-accent' : 'border-border'
                        )}
                      >
                        {watchGoal === g.value && <div className="h-2.5 w-2.5 rounded-full bg-accent" />}
                      </div>
                      <div>
                        <div className="font-semibold">{g.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{g.description}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {(watchGoal === 'lose_weight' || watchGoal === 'gain_muscle') && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-1.5 pt-2"
                  >
                    <Label htmlFor="target_weight_kg">Target Weight (kg)</Label>
                    <Input
                      id="target_weight_kg"
                      type="number"
                      error={!!errors.target_weight_kg}
                      {...register('target_weight_kg')}
                    />
                    {errors.target_weight_kg && <p className="text-xs text-danger">{errors.target_weight_kg.message}</p>}
                  </motion.div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.15 }}
                className="space-y-3"
              >
                {ACTIVITY_LEVELS.map((a) => (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() => setValue('activity_level', a.value as any, { shouldValidate: true })}
                    className={cn(
                      'flex items-center gap-3 w-full text-left p-3.5 rounded-xl border transition-all text-sm',
                      watchActivity === a.value
                        ? 'border-accent bg-accent-subtle/50 text-accent font-medium'
                        : 'border-border bg-card text-foreground hover:bg-muted'
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                        watchActivity === a.value ? 'border-accent text-accent' : 'border-border'
                      )}
                    >
                      {watchActivity === a.value && <div className="h-2.5 w-2.5 rounded-full bg-accent" />}
                    </div>
                    <div>
                      <div className="font-semibold">{a.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{a.description}</div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Dietary Preference</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {DIETARY_PREFERENCES.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setValue('dietary_preference', p.value as any, { shouldValidate: true })}
                        className={cn(
                          'p-2.5 rounded-lg border text-center transition-all text-xs font-medium truncate',
                          watchDietary === p.value
                            ? 'border-accent bg-accent-subtle text-accent'
                            : 'border-border bg-card text-muted-foreground hover:bg-muted'
                        )}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Allergens / Avoided Ingredients</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {ALLERGENS.map((a) => {
                      const isSelected = watchAllergens.includes(a.value)
                      return (
                        <button
                          key={a.value}
                          type="button"
                          onClick={() => {
                            const newAllergens = isSelected
                              ? watchAllergens.filter((v) => v !== a.value)
                              : [...watchAllergens, a.value]
                            setValue('allergens', newAllergens, { shouldValidate: true })
                          }}
                          className={cn(
                            'flex items-center justify-between p-2.5 rounded-lg border transition-all text-xs font-medium',
                            isSelected
                              ? 'border-danger bg-danger-subtle text-danger'
                              : 'border-border bg-card text-muted-foreground hover:bg-muted'
                          )}
                        >
                          <span>{a.label}</span>
                          {isSelected && <Check className="h-3.5 w-3.5 text-danger" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="water_goal_ml">Daily Water Goal (ml)</Label>
                  <Input
                    id="water_goal_ml"
                    type="number"
                    error={!!errors.water_goal_ml}
                    {...register('water_goal_ml')}
                  />
                  {errors.water_goal_ml && <p className="text-xs text-danger">{errors.water_goal_ml.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Unit System Preference</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setValue('unit_system', 'metric', { shouldValidate: true })}
                      className={cn(
                        'p-4 rounded-xl border text-center transition-all text-sm font-medium',
                        watchUnit === 'metric'
                          ? 'border-accent bg-accent-subtle text-accent'
                          : 'border-border bg-card text-muted-foreground hover:bg-muted'
                      )}
                    >
                      Metric
                      <div className="text-xs text-muted-foreground font-normal mt-1">cm / kg / ml</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setValue('unit_system', 'imperial', { shouldValidate: true })}
                      className={cn(
                        'p-4 rounded-xl border text-center transition-all text-sm font-medium',
                        watchUnit === 'imperial'
                          ? 'border-accent bg-accent-subtle text-accent'
                          : 'border-border bg-card text-muted-foreground hover:bg-muted'
                      )}
                    >
                      Imperial
                      <div className="text-xs text-muted-foreground font-normal mt-1">in / lbs / fl oz</div>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border pt-4">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={step === 1 || isSubmitting}
          type="button"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {step < totalSteps ? (
          <Button onClick={nextStep} type="button">
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit(onSubmit)} loading={isSubmitting}>
            Finish Setup
            <Check className="h-4 w-4 ml-2" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
