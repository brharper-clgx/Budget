using Budget.Config;
using Budget.Models;
using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Budget
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class UserSettingsPage : ContentPage
    {
        public UserSettingsPage()
        {
            InitializeComponent();
        }

        async void OnSaveButtonClicked(object sender, EventArgs e)
        {
            UserSettings userSettings = BindingContext as UserSettings;
            Settings.DailyAlloc = userSettings.DailyAllocation;
            await Navigation.PopAsync();
        }
    }
}