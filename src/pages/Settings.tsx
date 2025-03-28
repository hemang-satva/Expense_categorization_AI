
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Settings as SettingsIcon,
  CreditCard,
  Lock,
  Database,
  Globe,
  Moon,
  Sun,
  Check,
  Plus,
  HelpCircle,
  Save,
  Trash2,
  Download,
  FileDown,
} from "lucide-react";

const Settings = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [settingsData, setSettingsData] = useState({
    language: "english",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
    theme: "light",
    dataRetention: 12,
    exportFormat: "csv",
    passwordLastChanged: "3 months ago",
    connectedApps: [
      { id: 1, name: "Google Drive", status: "connected", lastSync: "2 days ago" },
    ],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveGeneralSettings = () => {
    toast.success("General settings saved", {
      description: "Your preferences have been updated successfully."
    });
  };

  const handleSaveSecuritySettings = () => {
    toast.success("Security settings saved", {
      description: "Your security preferences have been updated successfully."
    });
  };

  const handleExportData = () => {
    toast.success("Data export initiated", {
      description: `Your data will be exported in ${settingsData.exportFormat.toUpperCase()} format.`
    });
  };

  const handleDeleteAccount = () => {
    toast("Are you sure you want to delete your account?", {
      action: {
        label: "Delete Account",
        onClick: () => {
          toast.error("Account scheduled for deletion", {
            description: "Your account will be deleted in 30 days. You can cancel anytime before then."
          });
        }
      },
      cancel: {
        label: "Cancel",
        onClick: () => {}
      }
    });
  };

  const currencies = [
    { code: "USD", name: "US Dollar ($)", symbol: "$" },
    { code: "EUR", name: "Euro (€)", symbol: "€" },
    { code: "GBP", name: "British Pound (£)", symbol: "£" },
    { code: "JPY", name: "Japanese Yen (¥)", symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar (C$)", symbol: "C$" },
  ];

  const dateFormats = [
    { id: "MM/DD/YYYY", label: "MM/DD/YYYY", example: "12/31/2023" },
    { id: "DD/MM/YYYY", label: "DD/MM/YYYY", example: "31/12/2023" },
    { id: "YYYY-MM-DD", label: "YYYY-MM-DD", example: "2023-12-31" },
  ];

  return (
    <Layout>
      <div className={`opacity-0 ${isLoaded ? "opacity-100 transition-opacity duration-500" : ""}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight animate-fade-up">Settings</h1>
            <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Configure your app preferences and account settings
            </p>
          </div>
        </div>

        <Tabs defaultValue="general" className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="general">
              <SettingsIcon className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="data">
              <Database className="h-4 w-4 mr-2" />
              Data Management
            </TabsTrigger>
            <TabsTrigger value="connections">
              <Globe className="h-4 w-4 mr-2" />
              Connections
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Display Preferences</CardTitle>
                  <CardDescription>
                    Customize how information is displayed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Theme</label>
                    <div className="flex gap-2">
                      <Button
                        variant={settingsData.theme === "light" ? "default" : "outline"}
                        size="sm"
                        className="w-24 flex items-center justify-center"
                        onClick={() => setSettingsData({ ...settingsData, theme: "light" })}
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </Button>
                      <Button
                        variant={settingsData.theme === "dark" ? "default" : "outline"}
                        size="sm"
                        className="w-24 flex items-center justify-center"
                        onClick={() => setSettingsData({ ...settingsData, theme: "dark" })}
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </Button>
                      <Button
                        variant={settingsData.theme === "system" ? "default" : "outline"}
                        size="sm"
                        className="w-24 flex items-center justify-center"
                        onClick={() => setSettingsData({ ...settingsData, theme: "system" })}
                      >
                        System
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={settingsData.language === "english" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettingsData({ ...settingsData, language: "english" })}
                      >
                        <Check className={`mr-2 h-4 w-4 ${settingsData.language === "english" ? "opacity-100" : "opacity-0"}`} />
                        English
                      </Button>
                      <Button
                        variant={settingsData.language === "spanish" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettingsData({ ...settingsData, language: "spanish" })}
                      >
                        <Check className={`mr-2 h-4 w-4 ${settingsData.language === "spanish" ? "opacity-100" : "opacity-0"}`} />
                        Español
                      </Button>
                      <Button
                        variant={settingsData.language === "french" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettingsData({ ...settingsData, language: "french" })}
                      >
                        <Check className={`mr-2 h-4 w-4 ${settingsData.language === "french" ? "opacity-100" : "opacity-0"}`} />
                        Français
                      </Button>
                      <Button
                        variant={settingsData.language === "german" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettingsData({ ...settingsData, language: "german" })}
                      >
                        <Check className={`mr-2 h-4 w-4 ${settingsData.language === "german" ? "opacity-100" : "opacity-0"}`} />
                        Deutsch
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Format Preferences</CardTitle>
                  <CardDescription>
                    Configure date, time, and currency formats
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Format</label>
                    <div className="grid grid-cols-1 gap-2">
                      {dateFormats.map((format) => (
                        <Button
                          key={format.id}
                          variant={settingsData.dateFormat === format.id ? "default" : "outline"}
                          size="sm"
                          className="justify-between"
                          onClick={() => setSettingsData({ ...settingsData, dateFormat: format.id })}
                        >
                          <div className="flex items-center">
                            <Check className={`mr-2 h-4 w-4 ${settingsData.dateFormat === format.id ? "opacity-100" : "opacity-0"}`} />
                            <span>{format.label}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Example: {format.example}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Currency</label>
                    <div className="grid grid-cols-1 gap-2">
                      {currencies.slice(0, 3).map((currency) => (
                        <Button
                          key={currency.code}
                          variant={settingsData.currency === currency.code ? "default" : "outline"}
                          size="sm"
                          className="justify-between"
                          onClick={() => setSettingsData({ ...settingsData, currency: currency.code })}
                        >
                          <div className="flex items-center">
                            <Check className={`mr-2 h-4 w-4 ${settingsData.currency === currency.code ? "opacity-100" : "opacity-0"}`} />
                            <span>{currency.name}</span>
                          </div>
                          <span className="text-xs bg-secondary/50 px-2 py-1 rounded">
                            {currency.symbol}1,234.56
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button onClick={handleSaveGeneralSettings} className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password Settings</CardTitle>
                  <CardDescription>
                    Manage your account password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="current-password" className="text-sm font-medium">
                      Current Password
                    </label>
                    <Input id="current-password" type="password" placeholder="••••••••••" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="text-sm font-medium">
                      New Password
                    </label>
                    <Input id="new-password" type="password" placeholder="••••••••••" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium">
                      Confirm New Password
                    </label>
                    <Input id="confirm-password" type="password" placeholder="••••••••••" />
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center mt-1">
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Last changed: {settingsData.passwordLastChanged}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button onClick={handleSaveSecuritySettings} className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Enable 2FA for additional security
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">Session Timeout</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out after inactivity
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      15 minutes
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="text-xs"
                    >
                      30 minutes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      1 hour
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Security level: <span className="font-medium text-amber-500">Medium</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Security Audit
                  </Button>
                </CardFooter>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible actions that affect your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border border-destructive/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Delete Account</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          This will permanently delete your account and all associated data.
                          This action cannot be undone.
                        </p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Export</CardTitle>
                  <CardDescription>
                    Export your data for backup or analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Export Format</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={settingsData.exportFormat === "csv" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettingsData({ ...settingsData, exportFormat: "csv" })}
                      >
                        CSV
                      </Button>
                      <Button
                        variant={settingsData.exportFormat === "json" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettingsData({ ...settingsData, exportFormat: "json" })}
                      >
                        JSON
                      </Button>
                      <Button
                        variant={settingsData.exportFormat === "xlsx" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettingsData({ ...settingsData, exportFormat: "xlsx" })}
                      >
                        Excel
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Data to Export</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="export-transactions" defaultChecked />
                        <label htmlFor="export-transactions" className="text-sm">Transactions</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="export-categories" defaultChecked />
                        <label htmlFor="export-categories" className="text-sm">Categories</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="export-rules" defaultChecked />
                        <label htmlFor="export-rules" className="text-sm">Categorization Rules</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="export-insights" />
                        <label htmlFor="export-insights" className="text-sm">AI Insights</label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button onClick={handleExportData} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Retention</CardTitle>
                  <CardDescription>
                    Control how long your data is stored
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Keep Transaction Data For</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={settingsData.dataRetention === 6 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettingsData({ ...settingsData, dataRetention: 6 })}
                      >
                        6 Months
                      </Button>
                      <Button
                        variant={settingsData.dataRetention === 12 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettingsData({ ...settingsData, dataRetention: 12 })}
                      >
                        1 Year
                      </Button>
                      <Button
                        variant={settingsData.dataRetention === 24 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSettingsData({ ...settingsData, dataRetention: 24 })}
                      >
                        2 Years
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">Auto Backup</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically back up your data each month
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-medium">Privacy Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        Hide transaction details in exports
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex-col items-start gap-3">
                  <div className="text-sm text-muted-foreground w-full">
                    <FileDown className="inline-block mr-1 h-4 w-4" />
                    Last backup: <span className="font-medium">3 days ago</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Create Manual Backup
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="connections">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Applications</CardTitle>
                  <CardDescription>
                    Manage applications connected to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {settingsData.connectedApps.length > 0 ? (
                    <div className="space-y-3">
                      {settingsData.connectedApps.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center">
                              <Globe className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">{app.name}</h4>
                              <p className="text-xs text-muted-foreground">Last synced: {app.lastSync}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Disconnect</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Globe className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-1">No connected apps</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        Connect external applications to enhance your experience with data syncing.
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Connect New App
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bank Connections</CardTitle>
                  <CardDescription>
                    Link your bank accounts for automatic transaction import
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">No connected banks</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Connect your bank accounts to automatically import transactions and keep your data up to date.
                    </p>
                    <Button className="mt-6">
                      <Plus className="mr-2 h-4 w-4" />
                      Connect Bank Account
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="text-xs text-muted-foreground w-full text-center">
                    Bank data is securely transmitted and we do not store your bank credentials.
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
