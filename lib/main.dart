import 'dart:developer' as developer;

import 'package:flutter/material.dart';

import 'models/chambre.dart';
import 'models/infirmiere.dart';
import 'models/medecin.dart';
import 'models/patient.dart';
import 'screens/chambres_screen.dart';
import 'screens/infirmieres_screen.dart';
import 'screens/medecins_screen.dart';
import 'screens/patients_screen.dart';
import 'services/api_service.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hôpital Sycamore',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;
  bool _isLoading = false;
  String? _error;
  List<Medecin> _medecins = [];
  List<Infirmiere> _infirmieres = [];
  List<Chambre> _chambres = [];
  List<Patient> _patients = [];
  final _apiService = ApiService();

  @override
  void initState() {
    super.initState();
    developer.log('Initialisation de la page d\'accueil');
    _loadData();
  }

  Future<void> _loadData() async {
    developer.log('Début du chargement des données');
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      developer.log('Chargement des médecins...');
      final medecinsData = await _apiService.fetchData('doctors');
      developer.log('Chargement des infirmières...');
      final infirmieresData = await _apiService.fetchData('nurses');
      developer.log('Chargement des chambres...');
      final chambresData = await _apiService.fetchData('rooms');
      developer.log('Chargement des patients...');
      final patientsData = await _apiService.fetchData('patients');

      setState(() {
        _medecins = medecinsData.map((json) => Medecin.fromJson(json)).toList();
        _infirmieres =
            infirmieresData.map((json) => Infirmiere.fromJson(json)).toList();
        _chambres = chambresData.map((json) => Chambre.fromJson(json)).toList();
        _patients = patientsData.map((json) => Patient.fromJson(json)).toList();
        _isLoading = false;
      });
      developer.log('Chargement des données terminé avec succès');
    } catch (e) {
      developer.log('Erreur lors du chargement des données: $e');
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  Widget _buildContent() {
    if (_isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (_error != null) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error_outline, color: Colors.red, size: 48),
            const SizedBox(height: 16),
            Text(_error!, style: const TextStyle(color: Colors.red)),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _loadData,
              child: const Text('Réessayer'),
            ),
          ],
        ),
      );
    }

    switch (_selectedIndex) {
      case 0:
        return MedecinsScreen(medecins: _medecins);
      case 1:
        return InfirmieresScreen(infirmieres: _infirmieres);
      case 2:
        return ChambresScreen(chambres: _chambres);
      case 3:
        return PatientsScreen(patients: _patients);
      default:
        return const Center(child: Text('Page non trouvée'));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Hôpital Sycamore'),
        backgroundColor: Theme.of(context).colorScheme.primary,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _loadData,
            tooltip: 'Rafraîchir les données',
          ),
        ],
      ),
      body: _buildContent(),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.medical_services),
            label: 'Médecins',
          ),
          NavigationDestination(
            icon: Icon(Icons.health_and_safety),
            label: 'Infirmières',
          ),
          NavigationDestination(
            icon: Icon(Icons.bed),
            label: 'Chambres',
          ),
          NavigationDestination(
            icon: Icon(Icons.person),
            label: 'Patients',
          ),
        ],
      ),
    );
  }
}
