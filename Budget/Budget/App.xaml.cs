using Budget.Data;
using System;
using System.IO;
using Xamarin.Forms;

namespace Budget
{
    public partial class App : Application
    {
        static BudgetDatabase database;

        public static BudgetDatabase Database
        {
            get
            {
                if (database == null)
                {
                    database = new BudgetDatabase(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Payments.db3"));
                }
                return database;
            }
        }

        public App()
        {
            InitializeComponent();

            MainPage = new NavigationPage(new MainPage());
        }

        protected override void OnStart()
        {
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }
    }
}
