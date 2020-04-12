

using Plugin.Settings;
using Plugin.Settings.Abstractions;

namespace Budget.Config
{
    public static class Settings
    {
        private static ISettings AppSettings
        {
            get
            {
                return CrossSettings.Current;
            }
        }

        private const string DailyAllocKey = "daily_alloc";
        private static readonly decimal DailyAllocDefault = 50.0M;

        public static decimal DailyAlloc
        {
            get
            {
                return AppSettings.GetValueOrDefault(DailyAllocKey, DailyAllocDefault);
            }
            set
            {
                AppSettings.AddOrUpdateValue(DailyAllocKey, value);
            }
        }
    }
}
