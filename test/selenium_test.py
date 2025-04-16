import os
import time
import sys
import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import WebDriverException, TimeoutException

# Configuración específica
CHROME_PATH = "C:\\Program Files\\Google\\Chrome Dev\\Application\\chrome.exe"
CHROMEDRIVER_PATH = "C:\\Users\\Yonne\\Downloads\\chromedriver-win32\\chromedriver.exe"
TARGET_URL = "http://localhost:5173"

def is_url_alive(url):
    """Verifica que el servidor esté activo antes de iniciar pruebas"""
    try:
        response = requests.get(url)
        return response.status_code == 200
    except requests.RequestException:
        return False

def setup_driver():
    """Configura el driver usando ChromeDriver específico para Chrome Dev v137"""
    chrome_options = Options()
    chrome_options.binary_location = CHROME_PATH

    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1280,720")
    
    # chrome_options.add_argument("--headless=new")  # Descomentar si quieres ejecución en segundo plano

    try:
        service = Service(CHROMEDRIVER_PATH)
        driver = webdriver.Chrome(service=service, options=chrome_options)
        driver.implicitly_wait(5)
        return driver

    except Exception as e:
        print(f"❌ Error crítico: {str(e)}")
        sys.exit(1)

def test_application(driver):
    """Ejecuta pruebas en la aplicación"""
    print(f"\n🔍 Testing: {TARGET_URL}")

    try:
        # Test 1: Carga inicial
        start_time = time.time()
        driver.get(TARGET_URL)
        load_time = time.time() - start_time
        print(f"✔ Loaded in {load_time:.2f}s | Title: '{driver.title}'")

        # Test 2: Componentes clave
        components = {
            "Navbar": "//nav",
            "Game List": "//*[contains(@class,'game') or contains(@id,'game')]",
            "Add Button": "//button[contains(., 'Add') or contains(., 'Añadir')]"
        }

        for name, xpath in components.items():
            try:
                WebDriverWait(driver, 5).until(
                    EC.visibility_of_element_located((By.XPATH, xpath))
                )
                print(f"✔ {name} found")
            except TimeoutException:
                print(f"⚠ {name} not found")

        return True

    except Exception as e:
        print(f"❌ Test failed: {str(e)}")
        return False

def main():
    print("🚀 Starting Chrome Dev Tests")

    if not is_url_alive(TARGET_URL):
        print(f"❌ No se puede acceder a {TARGET_URL}. ¿Está corriendo tu servidor local?")
        sys.exit(1)

    try:
        driver = setup_driver()
        print("✔ ChromeDriver ready")

        if test_application(driver):
            print("\n✅ All tests passed!")
        else:
            print("\n⚠ Some tests failed")

        # Mantener abierto para inspección
        print("\nBrowser will close in 10 seconds...")
        time.sleep(10)

    finally:
        if 'driver' in locals():
            driver.quit()

if __name__ == "__main__":
    main()
