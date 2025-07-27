import React, { Children, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userThunk";
import { Eye, EyeOff } from "lucide-react";


const LoginOverlay = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      toast.error("Username and password required");
      return;
    }
    const user = { userName: username, password, isNewUser };
    try {
      const res = await dispatch(loginUser(user)).unwrap();
      toast.success("Logged in successfully");
      onSuccess();
    } catch (err) {
      toast.error(err || 'Login Failed');
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-[320px] space-y-4">
        <h2 className="text-2xl font-bold text-center text-indigo-500 dark:text-indigo-300">Login</h2>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-[70%] -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="newUser" checked={isNewUser} onCheckedChange={setIsNewUser}
            className="data-[state=checked]:bg-indigo-400 data-[state=checked]:border-indigo-400" />
          <Label htmlFor="newUser" className="text-sm">I'm a new user</Label>
        </div>

        <Button className="w-full mt-2 bg-indigo-400 hover:bg-indigo-500" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Sign In"}
        </Button>
      </div>
    </div>
  );
};

export default LoginOverlay;