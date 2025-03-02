// yzx--all.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
//
#define _CRT_SECURE_NO_WARNINGS
//#include "std.h"
#include "statsv.h"

bool ushvmm[1000];//用户有没有密码
std::string usrnm[1000];//用户的名字
int usrpsd[1000];//用户的密码

int main()
{
    FILE* dat1 = fopen("B:\\jm\\usrdat.dat", "r");
    int userct = 0;//用户数量
    int fhz = fscanf(dat1, "%d", &userct);
    //zc(fhz);
    for (int i = 1; i <= userct; i++) {
        std::string s;
        int fhz = fscanf(dat1, "%s %s", &s, &usrnm[i]);//有没有密码 & 输入名字
        //zc(fhz);
        if (s == "1") {
            ushvmm[i] = true; 
            int fhz = fscanf(dat1, "%d", &usrpsd[i]);//输入密码
            //zc(fhz);
        }
        else ushvmm[i] = false;
    }
    sp(ushvmm, usrnm, usrpsd);
    home(1, 1);
    return 0;
}

// 运行程序: Ctrl + F5 或调试 >“开始执行(不调试)”菜单
// 调试程序: F5 或调试 >“开始调试”菜单

// 入门使用技巧: 
//   1. 使用解决方案资源管理器窗口添加/管理文件
//   2. 使用团队资源管理器窗口连接到源代码管理
//   3. 使用输出窗口查看生成输出和其他消息
//   4. 使用错误列表窗口查看错误
//   5. 转到“项目”>“添加新项”以创建新的代码文件，或转到“项目”>“添加现有项”以将现有代码文件添加到项目
//   6. 将来，若要再次打开此项目，请转到“文件”>“打开”>“项目”并选择 .sln 文件
