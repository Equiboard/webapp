import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, useActionData } from 'react-router';
import { useState } from 'react';
import type { SerializedUser } from '@/types/user.types';

interface ProfileFormProps {
    user: SerializedUser;
}

export default function ProfileForm({ user }: ProfileFormProps) {
    const actionData = useActionData<{ success?: string; error?: string }>();
    const [showPasswordModal, setShowPasswordModal] = useState(false);

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
                    <div className="flex items-center justify-between">
                        <Button type="button" variant="outline" onClick={() => setShowPasswordModal(true)}>
                            Change Password
                        </Button>
                    </div>
                    {actionData?.success && <div className="text-sm text-green-600">{actionData.success}</div>}
                    {actionData?.error && <div className="text-sm text-red-600">{actionData.error}</div>}
                    <Button type="submit" className="w-full">
                        Update Profile
                    </Button>
                </Form>

                <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>Enter your current password and choose a new password.</DialogDescription>
                        </DialogHeader>
                        <Form method="post" className="space-y-4" onSubmit={() => setShowPasswordModal(false)}>
                            <input type="hidden" name="action" value="change_password" />
                            <div className="grid gap-2">
                                <Label htmlFor="current_password">Current Password</Label>
                                <Input id="current_password" name="current_password" type="password" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="new_password">New Password</Label>
                                <Input id="new_password" name="new_password" type="password" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm_password">Confirm New Password</Label>
                                <Input id="confirm_password" name="confirm_password" type="password" required />
                            </div>
                            <div className="flex gap-2">
                                <Button type="button" variant="outline" onClick={() => setShowPasswordModal(false)} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1">
                                    Update Password
                                </Button>
                            </div>
                        </Form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
