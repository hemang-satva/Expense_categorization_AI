
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  User,
  Mail,
  Bell,
  Save,
  Upload,
  Check,
  Brain,
  User as UserIcon,
  Lock,
  BellRing,
} from "lucide-react";

const Profile = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    notifications: {
      email: true,
      app: true,
      categorySuggestions: true,
      spendingAnomalies: true,
      weeklyReports: false,
    },
    aiPreferences: {
      learningEnabled: true,
      confidenceThreshold: 70,
      model: "GPT-4",
      preferredCategories: ["Food & Drink", "Transportation", "Entertainment"],
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveProfile = () => {
    toast.success("Profile updated", {
      description: "Your profile settings have been saved successfully."
    });
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated", {
      description: "Your notification settings have been saved successfully."
    });
  };

  const handleSaveAIPreferences = () => {
    toast.success("AI preferences updated", {
      description: "Your AI learning preferences have been saved successfully."
    });
  };

  const handleConfidenceChange = (value: number) => {
    setUserData({
      ...userData,
      aiPreferences: {
        ...userData.aiPreferences,
        confidenceThreshold: value,
      },
    });
  };

  return (
    <Layout>
      <div className={`opacity-0 ${isLoaded ? "opacity-100 transition-opacity duration-500" : ""}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight animate-fade-up">Profile</h1>
            <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
                <CardDescription>
                  Your profile picture and display name
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 overflow-hidden">
                    <UserIcon className="h-12 w-12 text-primary/40" />
                  </div>
                  <button className="absolute bottom-4 right-0 p-1.5 rounded-full bg-primary text-white">
                    <Upload className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="text-lg font-medium">{userData.name}</h3>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Change Photo</Button>
              </CardFooter>
            </Card>

            <Card className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
                <CardDescription>
                  Your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Subscription</span>
                  <Badge>Free Plan</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Analysis</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Connected Banks</span>
                  <Badge variant="secondary">0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Login</span>
                  <span className="text-sm text-muted-foreground">Today, 10:30 AM</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Upgrade Plan</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value="••••••••••"
                    disabled
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card className="animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Control how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={userData.notifications.email}
                    onCheckedChange={(checked) => setUserData({
                      ...userData,
                      notifications: { ...userData.notifications, email: checked }
                    })}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">In-App Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications within the application
                    </p>
                  </div>
                  <Switch
                    checked={userData.notifications.app}
                    onCheckedChange={(checked) => setUserData({
                      ...userData,
                      notifications: { ...userData.notifications, app: checked }
                    })}
                  />
                </div>
                
                <Separator />
                
                <h4 className="text-sm font-medium pt-2">Notification Types</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Switch
                      id="category-suggestions"
                      checked={userData.notifications.categorySuggestions}
                      onCheckedChange={(checked) => setUserData({
                        ...userData,
                        notifications: { ...userData.notifications, categorySuggestions: checked }
                      })}
                    />
                    <label htmlFor="category-suggestions" className="text-sm space-y-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      <div className="font-medium">Category Suggestions</div>
                      <p className="text-muted-foreground">
                        Get AI-based suggestions for categorization
                      </p>
                    </label>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Switch
                      id="spending-anomalies"
                      checked={userData.notifications.spendingAnomalies}
                      onCheckedChange={(checked) => setUserData({
                        ...userData,
                        notifications: { ...userData.notifications, spendingAnomalies: checked }
                      })}
                    />
                    <label htmlFor="spending-anomalies" className="text-sm space-y-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      <div className="font-medium">Spending Anomalies</div>
                      <p className="text-muted-foreground">
                        Alerts for unusual spending patterns
                      </p>
                    </label>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Switch
                      id="weekly-reports"
                      checked={userData.notifications.weeklyReports}
                      onCheckedChange={(checked) => setUserData({
                        ...userData,
                        notifications: { ...userData.notifications, weeklyReports: checked }
                      })}
                    />
                    <label htmlFor="weekly-reports" className="text-sm space-y-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      <div className="font-medium">Weekly Reports</div>
                      <p className="text-muted-foreground">
                        Receive a summary of your weekly activity
                      </p>
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline">Reset to Defaults</Button>
                <Button onClick={handleSaveNotifications}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>

            <Card className="animate-fade-up" style={{ animationDelay: "0.6s" }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-primary" />
                  AI Learning Preferences
                </CardTitle>
                <CardDescription>
                  Control how the AI learns from your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Learning Mode</h4>
                    <p className="text-sm text-muted-foreground">
                      Allow AI to learn from your categorization choices
                    </p>
                  </div>
                  <Switch
                    checked={userData.aiPreferences.learningEnabled}
                    onCheckedChange={(checked) => setUserData({
                      ...userData,
                      aiPreferences: { ...userData.aiPreferences, learningEnabled: checked }
                    })}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Confidence Threshold</h4>
                  <p className="text-sm text-muted-foreground">
                    Only apply AI suggestions above this confidence level
                  </p>
                  
                  <div className="grid grid-cols-5 gap-2 items-center">
                    <Button 
                      variant={userData.aiPreferences.confidenceThreshold === 50 ? "default" : "outline"} 
                      size="sm"
                      className="h-8"
                      onClick={() => handleConfidenceChange(50)}
                    >
                      50%
                    </Button>
                    <Button 
                      variant={userData.aiPreferences.confidenceThreshold === 60 ? "default" : "outline"} 
                      size="sm"
                      className="h-8"
                      onClick={() => handleConfidenceChange(60)}
                    >
                      60%
                    </Button>
                    <Button 
                      variant={userData.aiPreferences.confidenceThreshold === 70 ? "default" : "outline"} 
                      size="sm"
                      className="h-8"
                      onClick={() => handleConfidenceChange(70)}
                    >
                      70%
                    </Button>
                    <Button 
                      variant={userData.aiPreferences.confidenceThreshold === 80 ? "default" : "outline"} 
                      size="sm"
                      className="h-8"
                      onClick={() => handleConfidenceChange(80)}
                    >
                      80%
                    </Button>
                    <Button 
                      variant={userData.aiPreferences.confidenceThreshold === 90 ? "default" : "outline"} 
                      size="sm"
                      className="h-8"
                      onClick={() => handleConfidenceChange(90)}
                    >
                      90%
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">AI Model Selection</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose which AI model to use for categorization
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Button 
                      variant={userData.aiPreferences.model === "GPT-4" ? "default" : "outline"} 
                      className="justify-start"
                      onClick={() => setUserData({
                        ...userData,
                        aiPreferences: { ...userData.aiPreferences, model: "GPT-4" }
                      })}
                    >
                      <div className="flex items-center">
                        <Check className={`mr-2 h-4 w-4 ${userData.aiPreferences.model === "GPT-4" ? "opacity-100" : "opacity-0"}`} />
                        <span>GPT-4</span>
                      </div>
                    </Button>
                    <Button 
                      variant={userData.aiPreferences.model === "Claude" ? "default" : "outline"} 
                      className="justify-start"
                      onClick={() => setUserData({
                        ...userData,
                        aiPreferences: { ...userData.aiPreferences, model: "Claude" }
                      })}
                    >
                      <div className="flex items-center">
                        <Check className={`mr-2 h-4 w-4 ${userData.aiPreferences.model === "Claude" ? "opacity-100" : "opacity-0"}`} />
                        <span>Claude</span>
                      </div>
                    </Button>
                    <Button 
                      variant={userData.aiPreferences.model === "Gemini" ? "default" : "outline"} 
                      className="justify-start"
                      onClick={() => setUserData({
                        ...userData,
                        aiPreferences: { ...userData.aiPreferences, model: "Gemini" }
                      })}
                    >
                      <div className="flex items-center">
                        <Check className={`mr-2 h-4 w-4 ${userData.aiPreferences.model === "Gemini" ? "opacity-100" : "opacity-0"}`} />
                        <span>Gemini</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline">Reset Learning</Button>
                <Button onClick={handleSaveAIPreferences}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
