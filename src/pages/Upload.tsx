
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Upload as UploadIcon, 
  FileText, 
  ArrowRight, 
  Check,
  X
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

const Upload = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "success" | "error">("idle");

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const allowedTypes = [
      'application/vnd.ms-excel', 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'application/pdf'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV, Excel or PDF file",
        variant: "destructive"
      });
      return;
    }
    
    setFile(file);
    toast({
      title: "File selected",
      description: `${file.name} has been selected for upload.`
    });
  };

  const simulateUpload = () => {
    if (!file) return;
    
    setUploadStatus("uploading");
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setUploadProgress(100);
          
          // Start processing simulation after upload completes
          setTimeout(() => {
            setUploadStatus("processing");
            
            // Simulate processing completion
            setTimeout(() => {
              setUploadStatus("success");
              toast({
                title: "Upload successful",
                description: "Your statement has been analyzed successfully."
              });
            }, 2000);
          }, 500);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 200);
  };

  const cancelUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadStatus("idle");
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Upload Statement</h1>
          <p className="text-muted-foreground">
            Upload your bank statement for AI-powered analysis and categorization
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>
              Drag and drop your files here or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent>
            {uploadStatus === "idle" && (
              <>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-64 transition-colors ${
                    isDragging ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <UploadIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg text-muted-foreground mb-2">
                    Drag and drop your files here
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supports CSV, Excel and PDF files
                  </p>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".csv,.xlsx,.xls,.pdf"
                    onChange={handleFileChange}
                  />
                  <Button asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose File
                    </label>
                  </Button>
                </div>

                {file && (
                  <div className="mt-4 p-4 bg-secondary rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 mr-3 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={cancelUpload}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={simulateUpload}
                      >
                        <UploadIcon className="h-4 w-4 mr-1" />
                        Upload
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {(uploadStatus === "uploading" || uploadStatus === "processing") && (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {uploadStatus === "uploading" ? "Uploading..." : "Processing statement..."}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {uploadStatus === "uploading" 
                        ? `Uploading ${file?.name}` 
                        : "Using AI to analyze and categorize your statement"
                      }
                    </p>
                  </div>
                  {uploadStatus === "uploading" && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={cancelUpload}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
                
                <Progress value={uploadProgress} className="h-2" />
                
                {uploadStatus === "processing" && (
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium">AI is analyzing your statement.</span> We're identifying 
                      transactions, categorizing expenses, and preparing your insights.
                    </p>
                  </div>
                )}
              </div>
            )}

            {uploadStatus === "success" && (
              <div className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Upload Complete!</h3>
                <p className="text-muted-foreground mb-6">
                  Your statement has been analyzed and categorized successfully.
                </p>
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFile(null);
                      setUploadStatus("idle");
                    }}
                  >
                    Upload Another
                  </Button>
                  <Button>
                    View Transactions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {uploadStatus === "error" && (
              <div className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <X className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Upload Failed</h3>
                <p className="text-muted-foreground mb-6">
                  There was an error processing your statement. Please try again.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFile(null);
                    setUploadStatus("idle");
                  }}
                >
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supported Formats</CardTitle>
            <CardDescription>
              The following file formats are supported
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">CSV Files</p>
                  <p className="text-xs text-muted-foreground">
                    Comma-separated values exported from banks
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Excel Files</p>
                  <p className="text-xs text-muted-foreground">
                    .xlsx and .xls spreadsheet files
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 h-6 w-6 flex-shrink-0 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">PDF Statements</p>
                  <p className="text-xs text-muted-foreground">
                    Bank statements in PDF format
                  </p>
                </div>
              </li>
            </ul>
            
            <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="text-sm text-amber-800">
                <span className="font-medium">Note:</span> For best results, use CSV or Excel files. PDF parsing may vary based on the bank's format.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Upload;
