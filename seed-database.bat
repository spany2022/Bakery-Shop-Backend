@echo off
echo ========================================
echo   Seeding Database with Sample Data
echo ========================================
echo.

echo This will create:
echo - 6 categories (Breads, Cakes, Pastries, etc.)
echo - 12 sample products
echo - Admin user (phone: +1234567890)
echo - Demo user (phone: +15551234567)
echo.

pause

call npm run seed

echo.
echo ========================================
echo   Database seeded successfully!
echo ========================================
echo.
echo Login Credentials:
echo - Admin: +1234567890 (password: admin123)
echo - User: +15551234567 (password: user123)
echo - OTP: 123456 (any OTP works in demo)
echo.
pause


