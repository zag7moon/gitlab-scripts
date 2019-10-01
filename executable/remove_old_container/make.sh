DIRECTORY=$(cd `dirname $0` && pwd)

echo -e "\e[32mInstall pip\e[0m"
sudo apt install python-pip || (echo -e "\e[31mInstall pip failed\e[0m" && exit 1) && echo -e "\e[32mPip installed successfully\e[0m"

echo -e "\e[32mInstall requirements\e[0m"
pip install requests || (echo -e "\e[31mSetuptools install failed\e[0m" && exit 1) && echo -e "\e[32mRequests module upgraded successfully\e[0m"

echo -e "\e[32mMake completed successfully\e[0m"
