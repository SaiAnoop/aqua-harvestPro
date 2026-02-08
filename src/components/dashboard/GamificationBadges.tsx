import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Award, Target, Droplets, Leaf, Zap, Users, Calendar } from "lucide-react";

export const GamificationBadges = () => {
  const userStats = {
    totalSaved: 45000,
    streak: 12,
    level: 3,
    xp: 750,
    xpToNext: 250,
    rank: "Water Warrior"
  };

  const badges = [
    {
      id: 1,
      name: "First Drop",
      description: "Completed your first harvest analysis",
      icon: <Droplets className="w-6 h-6" />,
      earned: true,
      rarity: "Common",
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: 2,
      name: "Eco Champion",
      description: "Saved over 40,000L of water",
      icon: <Leaf className="w-6 h-6" />,
      earned: true,
      rarity: "Rare",
      color: "bg-green-100 text-green-800"
    },
    {
      id: 3,
      name: "Streak Master",
      description: "10+ days of consistent monitoring",
      icon: <Calendar className="w-6 h-6" />,
      earned: true,
      rarity: "Epic",
      color: "bg-purple-100 text-purple-800"
    },
    {
      id: 4,
      name: "Community Leader",
      description: "Help 5 neighbors start harvesting",
      icon: <Users className="w-6 h-6" />,
      earned: false,
      rarity: "Legendary",
      color: "bg-orange-100 text-orange-800"
    },
    {
      id: 5,
      name: "Tech Pioneer",
      description: "Integrate smart sensors",
      icon: <Zap className="w-6 h-6" />,
      earned: false,
      rarity: "Rare",
      color: "bg-yellow-100 text-yellow-800"
    }
  ];

  const achievements = [
    { name: "Water Saved", value: "45,000L", target: "50,000L", progress: 90 },
    { name: "CO₂ Reduced", value: "180kg", target: "200kg", progress: 90 },
    { name: "Money Saved", value: "₹18,000", target: "₹20,000", progress: 90 }
  ];

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-green-800">Conservation Impact</CardTitle>
              <p className="text-sm text-green-600">Level {userStats.level} • {userStats.rank}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              {userStats.streak} Day Streak! 🔥
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* XP Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progress to Level {userStats.level + 1}</span>
            <span className="text-sm text-muted-foreground">{userStats.xp}/1000 XP</span>
          </div>
          <Progress value={(userStats.xp / 1000) * 100} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">{userStats.xpToNext} XP to next level</p>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white/70 rounded-lg p-3 border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{achievement.name}</span>
                <Award className="w-4 h-4 text-green-600" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-700">{achievement.value}</span>
                  <span className="text-sm text-muted-foreground">of {achievement.target}</span>
                </div>
                <Progress value={achievement.progress} className="h-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Badges Earned ({badges.filter(b => b.earned).length}/{badges.length})
          </h4>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {badges.map((badge) => (
              <div 
                key={badge.id} 
                className={`p-2 rounded-lg border text-center transition-all hover:scale-105 ${
                  badge.earned 
                    ? 'bg-white shadow-sm border-green-200' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className={`p-1.5 rounded-full w-10 h-10 mx-auto mb-1 flex items-center justify-center ${
                  badge.earned ? badge.color : 'bg-gray-100 text-gray-400'
                }`}>
                  {badge.icon}
                </div>
                <h5 className={`font-medium text-xs mb-1 ${badge.earned ? 'text-gray-900' : 'text-gray-400'}`}>
                  {badge.name}
                </h5>
                <Badge variant="outline" className={`text-xs ${badge.color}`}>
                  {badge.rarity}
                </Badge>
                <p className={`text-xs mt-1 ${badge.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Challenge */}
        <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
          <h4 className="font-semibold text-amber-800 mb-2">🎯 Next Challenge</h4>
          <p className="text-sm text-amber-700 mb-2">
            "Community Leader" - Help 5 neighbors start rainwater harvesting
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-amber-600">Progress: 2/5 neighbors helped</span>
            <Badge className="bg-amber-600 text-white">+500 XP</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};