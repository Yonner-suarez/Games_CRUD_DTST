import os
import time
import sys
import traceback
import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import WebDriverException, TimeoutException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from test_create_game_form import test_create_game_form

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
            "Navbar": "//*[@class='_navbar_1r57x_1']",
            "Game List": "//div[contains(@class, 'container') and contains(@class, 'mt-2')]",
            "Add Button": "//button[normalize-space(text())='Crear Juego']"
        }


        for name, xpath in components.items():
            try:
                WebDriverWait(driver, 5).until(
                    EC.visibility_of_element_located((By.XPATH, xpath))
                )
                print(f"✔ {name} found")
            except TimeoutException:
                print(f"⚠ {name} not found")

        # Test 3: Elementos exclusivos de la home (/)
        if driver.current_url.rstrip('/') == TARGET_URL.rstrip('/'):
            print("\n🔎 Verificando elementos exclusivos de la página principal")

            try:
                WebDriverWait(driver, 5).until(
                    EC.visibility_of_element_located((By.XPATH, "//nav//input[@type='search']"))
                )
                print("✔ Search Input found in Navbar")
            except TimeoutException:
                print("⚠ Search Input not found in Navbar")

            try:
                WebDriverWait(driver, 5).until(
                    EC.visibility_of_element_located((By.XPATH, "//nav//img[@alt='logo']"))
                )
                print("✔ Logo Image found in Navbar")
            except TimeoutException:
                print("⚠ Logo Image not found in Navbar")
        else:
            print("ℹ No estás en la ruta '/', se omite verificación de Search Input y Logo")

        # Test 4: Click en "Crear Juego"
        try:
            print("\n🔎 Verificando click boton añadir juego")
            crear_juego_btn = WebDriverWait(driver, 5).until(
                EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Crear Juego')]"))
            )
            #clickear el boton de crear juego
            crear_juego_btn.click()
            print("✔ Clicked on 'Crear Juego' button")
            #Verificar el nav
            test_navbar_elements_absent_in_form(driver)
            #Crear Juego
            test_create_game_form(driver)

        except TimeoutException:
            print("⚠ 'Crear Juego' button not found or not clickable")

        return True

    except Exception as e:
        print(f"❌ Test failed: {str(e)}")
        return False

def test_navbar_elements_absent_in_form(driver):
    """Verifica que ciertos elementos del navbar NO estén visibles al abrir el formulario de Crear Juego"""
    print("\n🔍 Verificando que elementos del navbar NO estén presentes en el formulario")

    try:
        WebDriverWait(driver, 5).until(
            EC.visibility_of_element_located((By.XPATH, "//form"))
        )
        print("✔ Formulario visible")

        try:
            search_input = driver.find_elements(By.XPATH, "//nav//input[@type='search']")
            if any(elem.is_displayed() for elem in search_input):
                print("⚠ Search Input aún visible en el navbar (debería ocultarse)")
            else:
                print("✔ Search Input no está visible (correcto)")
        except Exception as e:
            print(f"✔ Search Input no encontrado (correcto)")

        # Verifica que el logo ya no esté visible
        try:
            logo_img = driver.find_elements(By.XPATH, "//nav//img[@alt='logo']")
            if any(elem.is_displayed() for elem in logo_img):
                print("⚠ Logo aún visible en el navbar (debería ocultarse)")
            else:
                print("✔ Logo no está visible (correcto)")
        except Exception as e:
            print(f"✔ Logo no encontrado (correcto)")

    except TimeoutException:
        print("⚠ El formulario no se cargó correctamente, no se pueden hacer las verificaciones")
  
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
