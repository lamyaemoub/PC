import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { getQueryFn } from "@/lib/queryClient";
import { Link } from "wouter";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, Home } from "lucide-react";

interface WaitlistUser {
  id: number;
  email: string;
  joinedAt: string;
}

export default function AdminPage() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();

  const {
    data: waitlistUsers,
    isLoading,
    error,
  } = useQuery<WaitlistUser[]>({
    queryKey: ["/api/admin/waitlist"],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!user, // Only run the query if the user is logged in
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-center max-w-md">
          You need to be logged in to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Goji Admin</h1>
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">
              {user?.username}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4 mr-2" />
              )}
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto py-10 px-6 flex-1">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Waitlist Submissions</h1>
          <Table>
            <TableCaption>A list of all waitlist submissions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {waitlistUsers?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No waitlist submissions yet.
                  </TableCell>
                </TableRow>
              )}
              {waitlistUsers?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.joinedAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}