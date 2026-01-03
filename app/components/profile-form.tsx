import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, useActionData } from 'react-router';
import type { SerializedUser } from '@/types';

interface ProfileFormProps {
    user: SerializedUser;
}

export default function ProfileForm({ user }: ProfileFormProps) {
    const actionData = useActionData<{ success?: string; error?: string }>();

    if (!user) {
        return (
            <Card className="mx-auto max-w-md">
                <CardContent className="p-6">
                    <div className="text-center">Loading...</div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <Form method="post" className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input id="first_name" name="first_name" type="text" defaultValue={user.first_name || ''} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input id="last_name" name="last_name" type="text" defaultValue={user.last_name || ''} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={user.email || ''} disabled className="bg-muted" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">New Password (optional)</Label>
                        <Input id="password" name="password" type="password" placeholder="Enter new password" />
                    </div>
                    {actionData?.success && <div className="text-sm text-green-600">{actionData.success}</div>}
                    {actionData?.error && <div className="text-sm text-red-600">{actionData.error}</div>}
                    <Button type="submit" className="w-full">
                        Update Profile
                    </Button>
                </Form>
            </CardContent>
        </Card>
    );
}
