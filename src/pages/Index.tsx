
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Upload, 
  Clock, 
  RefreshCw, 
  ChevronRight,
  Wallet,
  DollarSign,
  CreditCard
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Demo data
const recentTransactions = [
  { id: 1, description: "Amazon.com", date: "Today", amount: -84.99, category: "Shopping" },
  { id: 2, description: "Starbucks", date: "Yesterday", amount: -5.60, category: "Food & Drink" },
  { id: 3, description: "Payroll Deposit", date: "Jul 15", amount: 2400.00, category: "Income" },
  { id: 4, description: "Uber", date: "Jul 14", amount: -12.50, category: "Transportation" },
];

const monthlyData = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 2210 },
  { name: "Mar", income: 2000, expenses: 1900 },
  { name: "Apr", income: 2780, expenses: 2500 },
  { name: "May", income: 1890, expenses: 1700 },
  { name: "Jun", income: 2390, expenses: 2000 },
  { name: "Jul", income: 3490, expenses: 2300 },
];

const pieData = [
  { name: "Housing", value: 35 },
  { name: "Food", value: 20 },
  { name: "Transportation", value: 15 },
  { name: "Entertainment", value: 10 },
  { name: "Shopping", value: 10 },
  { name: "Other", value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#AAAAAA'];

const Index = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Animation for AI processing progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, 15);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const totalIncome = 4200.00;
  const totalExpenses = 1850.75;
  const netBalance = totalIncome - totalExpenses;

  const goToUpload = () => {
    navigate("/upload");
  };

  return (
    <Layout>
      <div className={`opacity-0 ${isLoaded ? "opacity-100 transition-opacity duration-500" : ""}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight animate-fade-up">Good afternoon, Alex</h1>
            <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Here's a summary of your financial activity
            </p>
          </div>
          <Button onClick={goToUpload} className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Statement
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground text-sm font-normal">Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
                <div className="ml-2 text-sm font-medium text-green-500 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  8.2%
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <DollarSign className="h-4 w-4 mr-1 text-income" /> 
                <span>Last updated yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground text-sm font-normal">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
                <div className="ml-2 text-sm font-medium text-red-500 flex items-center">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  3.1%
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <CreditCard className="h-4 w-4 mr-1 text-expense" /> 
                <span>12 categories this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-muted-foreground text-sm font-normal">Net Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <div className="text-2xl font-bold">${netBalance.toLocaleString()}</div>
                <div className="ml-2 text-sm font-medium text-emerald-500 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  12.5%
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-muted-foreground">
                <Wallet className="h-4 w-4 mr-1 text-transfer" /> 
                <span>Savings rate: 23%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
              <CardDescription>Income vs. Expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, undefined]}
                      contentStyle={{ 
                        borderRadius: 8, 
                        border: '1px solid hsl(var(--border))',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      }} 
                    />
                    <Bar dataKey="income" fill="hsl(var(--income))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="hsl(var(--expense))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-up" style={{ animationDelay: "0.7s" }}>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Where your money is going</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, undefined]}
                      contentStyle={{ 
                        borderRadius: 8, 
                        border: '1px solid hsl(var(--border))',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="animate-fade-up" style={{ animationDelay: "0.8s" }}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activity</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <span>View All</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        transaction.amount > 0 
                          ? "bg-green-100" 
                          : "bg-red-100"
                      }`}>
                        {transaction.amount > 0 ? (
                          <ArrowUpRight className="h-5 w-5 text-income" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5 text-expense" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{transaction.category}</span>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {transaction.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={`font-medium ${
                      transaction.amount > 0 
                        ? "text-income" 
                        : "text-expense"
                    }`}>
                      {transaction.amount > 0 ? "+" : ""}
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <RefreshCw className="h-4 w-4 mr-1" />
                <span>AI processing</span>
              </div>
              <div className="w-1/2">
                <Progress value={progress} className="h-2" />
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
