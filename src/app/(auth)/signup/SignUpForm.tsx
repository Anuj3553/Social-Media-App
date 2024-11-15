"use client"

import { useState, useTransition } from "react"
import { signupSchema, SignUpValues } from "@/lib/validation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUp } from "./actions"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/PasswordInput"
import LoadingButton from "@/components/LoadingButton"

export default function SignUpForm() {
    const [error, setError] = useState<string>();

    // Use a transition to prevent the form from being submitted multiple times
    const [isPending, startTransition] = useTransition()

    const form = useForm<SignUpValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
        }
    })

    async function onSubmit(values: SignUpValues) {
        setError(undefined)
        startTransition(async () => {
            const { error } = await signUp(values)
            if (error) setError(error)
        })
    }

    return <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {error && <p className="text-center text-destructive">{error}</p>}
            {/* Username Feild */}
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {/* Email Feild */}
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {/* Password Feild */}
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <PasswordInput placeholder="Password" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <LoadingButton type="submit" className="w-full" loading={isPending}>Sign Up</LoadingButton>
        </form>
    </Form>
}
