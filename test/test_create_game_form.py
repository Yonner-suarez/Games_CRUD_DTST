import os
import time
import sys
import traceback
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import WebDriverException, TimeoutException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys


def test_create_game_form(driver):
    """Llena el formulario de crear juego y lo envía"""

    print("\n🧪 Test: Crear Juego (formulario)")

    try:
        # Esperar que el formulario esté presente
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//form"))
        )
        print("✔ Formulario cargado")

        # Llenar campos
        driver.find_element(By.NAME, "code").send_keys("123456")
        driver.find_element(By.NAME, "name").send_keys("Juego de Prueba")
        driver.find_element(By.NAME, "numberOfPlayers").send_keys("4")
        driver.find_element(By.NAME, "releaseYear").send_keys("2023")
        driver.find_element(By.NAME, "description").send_keys("Un juego de prueba para automatización")

        # MEJORA 1: Selección más robusta de React Select
        print("🔘 Seleccionando consola...")
        
        # Paso 1: Localizar el contenedor del select (no el input interno)
        select_container = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//*[@id='Consola']/.."))
        )
        
        # Paso 2: Hacer click para abrir el dropdown
        driver.execute_script("arguments[0].scrollIntoView(true);", select_container)
        select_container.click()
        
        react_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "react-select-3-input"))
        )

        # Enfocar, enviar texto y presionar Enter
        react_input.send_keys("PlayStation 4")
        time.sleep(0.5)
        react_input.send_keys(Keys.ENTER)
        print("✔ Consola seleccionada con teclas: PlayStation 4")

        # Subir imagen
        print("📂 Subiendo imagen...")
        file_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//input[@type='file']"))
        )

        # Hacer el input de archivo visible
        driver.execute_script("""
            arguments[0].style.display = 'block';
            arguments[0].style.opacity = 1;
            arguments[0].style.visibility = 'visible';
        """, file_input)

        file_path = os.path.abspath("C:\\AppServ\\www\\Games_CRUD_DTST\\test\\Assets\\test-image.png")
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"❌ Archivo no encontrado: {file_path}")

        file_input.send_keys(file_path)
        print("✔ Imagen cargada")

        # Esperar a que se procese la imagen
        time.sleep(1.5)

        # Click en "Registra ahora"
        submit_btn = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Registra ahora')]"))
        )
        
        if submit_btn.is_enabled():
            driver.execute_script("arguments[0].scrollIntoView(true);", submit_btn)
            time.sleep(0.3)  # deja que el scroll termine
            driver.execute_script("arguments[0].click();", submit_btn)
        else:
            print("⚠ Botón deshabilitado. Verifica validación")
            # Tomar screenshot para debug
            driver.save_screenshot("form_error.png")

        # Esperar alerta de éxito
        try:
            WebDriverWait(driver, 10).until(
                EC.visibility_of_element_located((By.CLASS_NAME, "swal2-popup"))
            )
            print("🎉 Juego registrado exitosamente")
        except TimeoutException:
            print("⚠ No se mostró la alerta de éxito")
            driver.save_screenshot("alert_missing.png")

    except Exception as e:
        print(f"❌ Error durante el test de creación: {str(e)}")
        # Tomar screenshot del error
        driver.save_screenshot("test_error.png")
        traceback.print_exc()
        raise